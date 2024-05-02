# Типизация в React

(видео источник)[https://www.youtube.com/watch?v=92qcfeWxtnY]

> :warning: бонусом на канале можно посмотреть введение в **Drag & Drop**

**установка webpack с шаблоном typescript**

```bash
npx create-react-app . --template typescript
```

## Содержание

1. Типизация пропсов
2. Глобальные типы и типизация вложенных объектов (types/types.ts)
3. Типизация стейта cпомощью дженерика
4. Типизация ответа от axios с помощью дженерика
5. Типизация переиспользуемого универсального списка Item компонентов
6. Типизация событий
   1. SynteticEvent - особенность событий в React
   2. ChangeEvent
   3. MouseEvent
   4. DragEvent
7. Работа с неуправляемым input
8. ...

## 1. Типизация пропсов

Пример типовой типизации пропсов

```ts
interface CardProps {
  width: string;
  height?: string /* необязательный параметр */;
  variant?: CardVariant;
  children?: ReactNode /* !!! универсальный тип - включает все возможные значения узлов в JSX */;
  onClick?: () => void /* callback который ничего не принимает, и не возвращает */;
  onClickBtn?: (
    count: number
  ) => void /* callback который принимает число, и ничего не возвращает */;
}
```

типизация функционального компонента (**FC**)

```jsx
const Card: FC<CardProps2> = ({
  /* FC возвращает функиональный компонент */
  onClick /* передача в пропс callback */,
  width,
  height = "100px" /* пропс по умолчанию */,
  variant,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        border: variant === CardVariant.outlined ? "1px solid orange" : "none",
        background: variant === CardVariant.primary ? "lightblue" : "",
      }}
    >
      {children}
    </div>
  );
};
```

## 2. Глобальные типы и типизация вложенных объектов

для описания типов используемых во всем проекте удобно использовать файл: **src/types/types.ts**

```ts
/* в этом файле описываются глобальные типы, которые могут использоваться в различных частях приложения */
export interface IAddress {
  /* интерейы не обязательно сопровождать I в начале */ street: string;
  suite?: string;
  city: string;
  zipcode?: string;
  geo?: {
    /* Вложенный объект можно например и вынести в отдельный интерфейс IGeo*/
    lat: number;
    lng: number;
  };
}

/* https://jsonplaceholder.typicode.com/users */
export interface IUser {
  id: number;
  name: string;
  email: string;
  address: IAddress /* для удобства типизация комплексного объекта address вынесен в отдельный интерфейс */;
}
```

## 3. Типизация стейта с помощью дженерика

```js
  const [users, setUsers] = useState<IUser[]>([]); /* благодаря <IUser[]> мы ограничиваем возможные типы в состоянии */
```

## 4. Типизация ответа от axios с помощью дженерика

```js
  const response = await axios.get<IUser[]>(URL);
  setUsers(response.data);
```

## 5. Типизация переиспользуемого универсального списка Item компонентов

```jsx
/* универсальный компонент для отрисовки всевозможных списков */
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  const { items, renderItem } = props;
  return <>{items.map(renderItem)}</>;
}
```

```jsx
/**
 * использование универсального списка на примере todos
 */
<List
  items={todos}
  renderItem={(todo: ITodo) => <TodoItem key={todo.id} todo={todo} />}
/>;

/* Реализация компонента передаваемого в универсальный список */
import { FC } from "react";
import { ITodo } from "../types/types";

interface TodoProps {
  todo: ITodo;
}

const TodoItem: FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} /> {todo.id}
      {todo.title}
    </div>
  );
};

export default TodoItem;

/* интерфейс ITodo (справочно) */
export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

## 6. Типизация событий

В Rect для совместимости с различными браузерами интерфейсные события оборачиваются в обертку SyntheticEvent

Типовая обработка событий на React выглядит так:

```js
/**
 * Лучше добавлять React впереди, т.к. типы событий React могут конфликтовать с не реакт событиями
 * для типизации targets события конкретизируется тип дженерика <HTMLButtonElement>
 */
const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(crypto.randomUUID().toString().slice(0, 6) + "--" + value);
};
```

## 7. Работа с неуправляемым input

useRef так же можно типизировать, чтобы указать на какой элемент будет ссылаться ссылка.

```jsx
  const inputRef = useRef\<HTMLInputElement\>(null);
```

## 8. Типизация работы с react-router-dom

> :warning: чтобы работать с типами требуется так же установить типы

```bash
pnpm i -E react-router-dom @types/react-router-dom
```

**типизация useParams**
пример типизации (id кастомные поле используемое в роутинге, но для работы типизации также надо указать [key: string]: string | undefined;)

```ts
interface UserItemPageParams {
  [key: string]: string | undefined;
  id: string;
}
```

# Выводы

Сложный случаев здесь не рассмотрено, но зато рассмотрены базовые, есть пробел по типизации асинхронного кода
При использовании react-router-dom требуется установка типов @types/react-router-dom
