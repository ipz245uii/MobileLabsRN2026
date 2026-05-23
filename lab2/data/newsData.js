export const generateNews = (startId = 1, count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(startId + i),
    title: `Заголовок новини ${startId + i}`,
    description: `Це короткий опис новини номер ${startId + i}. Тут міститься важлива інформація про подію.`,
    image: `https://picsum.photos/seed/${startId + i}/400/200`,
    date: new Date(2024, 0, startId + i).toLocaleDateString('uk-UA'),
    category: i % 2 === 0 ? 'Технології' : 'Наука',
  }));
};

export const initialNews = generateNews(1, 10);

export const contactsData = [
  {
    title: 'Викладачі',
    data: [
      { id: '1', name: 'Іваненко Іван Іванович', phone: '+38 (050) 111-11-11', email: 'ivan@ztu.edu.ua' },
      { id: '2', name: 'Петренко Петро Петрович', phone: '+38 (050) 222-22-22', email: 'petro@ztu.edu.ua' },
      { id: '3', name: 'Сидоренко Сидір Сидорович', phone: '+38 (050) 333-33-33', email: 'sydor@ztu.edu.ua' },
    ],
  },
  {
    title: 'Студенти',
    data: [
      { id: '4', name: 'Коваленко Олег Васильович', phone: '+38 (050) 444-44-44', email: 'oleg@gmail.com' },
      { id: '5', name: 'Мельник Анна Іванівна', phone: '+38 (050) 555-55-55', email: 'anna@gmail.com' },
      { id: '6', name: 'Бондаренко Дмитро Олегович', phone: '+38 (050) 666-66-66', email: 'dmytro@gmail.com' },
    ],
  },
  {
    title: 'Адміністрація',
    data: [
      { id: '7', name: 'Директор Університету', phone: '+38 (050) 777-77-77', email: 'director@ztu.edu.ua' },
      { id: '8', name: 'Деканат ФІТ', phone: '+38 (050) 888-88-88', email: 'fit@ztu.edu.ua' },
    ],
  },
];