import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type FileItem = {
  name: string;
  isDirectory: boolean;
  uri: string;
};

export default function ExploreScreen() {
  const [currentPath, setCurrentPath] = useState<string>(
    FileSystem.documentDirectory ?? ''
  );
  const [files, setFiles] = useState<FileItem[]>([]);
  const [pathHistory, setPathHistory] = useState<string[]>([]);

  const [createFolderVisible, setCreateFolderVisible] = useState(false);
  const [createFileVisible, setCreateFileVisible] = useState(false);
  const [viewFileVisible, setViewFileVisible] = useState(false);
  const [editFileVisible, setEditFileVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileInfo, setFileInfo] = useState<any>(null);

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  const loadFiles = async (path: string) => {
    try {
      const result = await FileSystem.readDirectoryAsync(path);
      const items: FileItem[] = await Promise.all(
        result.map(async (name) => {
          const uri = path + name;
          const info = await FileSystem.getInfoAsync(uri);
          return {
            name,
            isDirectory: info.isDirectory ?? false,
            uri,
          };
        })
      );
      setFiles(items);
    } catch (e) {
      console.error(e);
    }
  };

  const goIntoFolder = (item: FileItem) => {
    if (item.isDirectory) {
      setPathHistory((prev) => [...prev, currentPath]);
      setCurrentPath(item.uri + '/');
    }
  };

  const goBack = () => {
    if (pathHistory.length === 0) return;
    const prev = pathHistory[pathHistory.length - 1];
    setPathHistory((h) => h.slice(0, -1));
    setCurrentPath(prev);
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    await FileSystem.makeDirectoryAsync(currentPath + newFolderName);
    setNewFolderName('');
    setCreateFolderVisible(false);
    loadFiles(currentPath);
  };

  const createFile = async () => {
    if (!newFileName.trim()) return;
    const name = newFileName.endsWith('.txt') ? newFileName : newFileName + '.txt';
    await FileSystem.writeAsStringAsync(currentPath + name, newFileContent);
    setNewFileName('');
    setNewFileContent('');
    setCreateFileVisible(false);
    loadFiles(currentPath);
  };

  const openFile = async (item: FileItem) => {
    const content = await FileSystem.readAsStringAsync(item.uri);
    setFileContent(content);
    setSelectedFile(item);
    setViewFileVisible(true);
  };

  const openEdit = async (item: FileItem) => {
    const content = await FileSystem.readAsStringAsync(item.uri);
    setEditContent(content);
    setSelectedFile(item);
    setEditFileVisible(true);
  };

  const saveEdit = async () => {
    if (!selectedFile) return;
    await FileSystem.writeAsStringAsync(selectedFile.uri, editContent);
    setEditFileVisible(false);
    loadFiles(currentPath);
  };

  const deleteItem = (item: FileItem) => {
    Alert.alert(
      'Видалення',
      `Ви впевнені що хочете видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            await FileSystem.deleteAsync(item.uri);
            loadFiles(currentPath);
          },
        },
      ]
    );
  };

  const showInfo = async (item: FileItem) => {
    const info = await FileSystem.getInfoAsync(item.uri);
    setFileInfo(info);
    setSelectedFile(item);
    setInfoVisible(true);
  };

  const formatSize = (size?: number) => {
    if (!size) return '0 B';
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '—';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getExtension = (name: string) => {
    const parts = name.split('.');
    return parts.length > 1 ? '.' + parts[parts.length - 1] : 'папка';
  };

  const renderItem = ({ item }: { item: FileItem }) => (
    <View style={styles.fileRow}>
      <TouchableOpacity
        style={styles.fileName}
        onPress={() => (item.isDirectory ? goIntoFolder(item) : openFile(item))}
      >
        <Text style={styles.fileIcon}>{item.isDirectory ? '📁' : '📄'}</Text>
        <Text style={styles.fileText}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        {!item.isDirectory && (
          <TouchableOpacity onPress={() => openEdit(item)}>
            <Text style={styles.actionBtn}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => showInfo(item)}>
          <Text style={styles.actionBtn}>ℹ️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item)}>
          <Text style={styles.actionBtn}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.path} numberOfLines={1}>
          📂 {currentPath}
        </Text>

        {pathHistory.length > 0 && (
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Text style={styles.backText}>⬅️ Назад</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={files}
          keyExtractor={(item) => item.uri}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Папка порожня</Text>}
        />

        <View style={styles.bottomBtns}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => setCreateFolderVisible(true)}
          >
            <Text style={styles.createBtnText}>+ Папка</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => setCreateFileVisible(true)}
          >
            <Text style={styles.createBtnText}>+ Файл</Text>
          </TouchableOpacity>
        </View>

        {/* Модалка — створення папки */}
        <Modal visible={createFolderVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Нова папка</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Назва папки"
                  value={newFolderName}
                  onChangeText={setNewFolderName}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity style={styles.modalBtn} onPress={createFolder}>
                  <Text style={styles.modalBtnText}>Створити</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateFolderVisible(false)}>
                  <Text style={styles.cancel}>Скасувати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Модалка — створення файлу */}
        <Modal visible={createFileVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Новий файл</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Назва файлу"
                  value={newFileName}
                  onChangeText={setNewFileName}
                  returnKeyType="next"
                />
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder="Вміст файлу"
                  value={newFileContent}
                  onChangeText={setNewFileContent}
                  multiline
                />
                <TouchableOpacity style={styles.modalBtn} onPress={createFile}>
                  <Text style={styles.modalBtnText}>Створити</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateFileVisible(false)}>
                  <Text style={styles.cancel}>Скасувати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Модалка — перегляд файлу */}
        <Modal visible={viewFileVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>📄 {selectedFile?.name}</Text>
              <Text style={styles.fileContentText}>{fileContent}</Text>
              <TouchableOpacity onPress={() => setViewFileVisible(false)}>
                <Text style={styles.cancel}>Закрити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Модалка — редагування файлу */}
        <Modal visible={editFileVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>✏️ {selectedFile?.name}</Text>
                <TextInput
                  style={[styles.input, { height: 150 }]}
                  value={editContent}
                  onChangeText={setEditContent}
                  multiline
                />
                <TouchableOpacity style={styles.modalBtn} onPress={saveEdit}>
                  <Text style={styles.modalBtnText}>Зберегти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditFileVisible(false)}>
                  <Text style={styles.cancel}>Скасувати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Модалка — інформація про файл */}
        <Modal visible={infoVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>ℹ️ Інформація</Text>
              <Text style={styles.infoText}>📛 Назва: {selectedFile?.name}</Text>
              <Text style={styles.infoText}>
                🗂 Тип: {selectedFile ? getExtension(selectedFile.name) : '—'}
              </Text>
              <Text style={styles.infoText}>
                💾 Розмір: {fileInfo?.size ? formatSize(fileInfo.size) : '—'}
              </Text>
              <Text style={styles.infoText}>
                🕒 Змінено: {fileInfo?.modificationTime ? formatDate(fileInfo.modificationTime) : '—'}
              </Text>
              <TouchableOpacity onPress={() => setInfoVisible(false)}>
                <Text style={styles.cancel}>Закрити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 12 },
  path: { fontSize: 12, color: '#7f8c8d', marginBottom: 8 },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 16, color: '#4a90e2' },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
  },
  fileName: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  fileIcon: { fontSize: 20, marginRight: 10 },
  fileText: { fontSize: 15, color: '#2c3e50' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { fontSize: 20 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40 },
  bottomBtns: { flexDirection: 'row', gap: 12, marginTop: 10 },
  createBtn: {
    flex: 1,
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  createBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2c3e50' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  modalBtn: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  cancel: { textAlign: 'center', color: '#e74c3c', fontSize: 15, marginTop: 4 },
  fileContentText: { fontSize: 14, color: '#34495e', marginBottom: 16, lineHeight: 22 },
  infoText: { fontSize: 15, color: '#34495e', marginBottom: 10 },
});