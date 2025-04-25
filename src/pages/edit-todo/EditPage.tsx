import styles from './EditPage.module.scss';
import {getTodos} from "../../store/services/todo-list/selectors/getTodoById.ts";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import ROUTES from "../../app/routing/routes.ts";
import {InputApp} from "../../shared/ui/input/InputApp.tsx";
import TimeSvg from '../../shared/assets/svg/time.svg';
import Button from "../../shared/ui/button/Button.tsx";
import DropDownMenu, {IDropDownMenuValue} from "../../shared/ui/drop-down-menu/DropDownMenu.tsx";
import Priority from "../../entities/models/Priority.ts";
import {DateUtils} from "../../shared/utils/Date.ts";
import {useEffect, useState} from "react";

export const EditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const todo = useSelector(getTodos).find(todo => todo.id === id);

    // Все хуки вызываем без условий
    const [dateRussian, setDateRussian] = useState<string>("");

    // Обновляем дату, когда todo появится
    useEffect(() => {
        if (todo?.dateCompleted) {
            setDateRussian(DateUtils.formatUTCToRussian(todo.dateCompleted));
        }
    }, [todo]);

    // Навигация на 404 при отсутствии todo
    useEffect(() => {
        if (todo === undefined) return; // ждём пока появится todo
        if (!todo) navigate(ROUTES.NOT_FOUND);
    }, [todo, navigate]);

    if (!todo) return <div>Загрузка...</div>;

    const priority: Map<Priority, IDropDownMenuValue> = new Map();
    priority.set(Priority.LOW, {
        value: 'Низкий',
        color: 'var(--priorityLow)',
    })
    priority.set(Priority.MEDIUM, {
        value: 'Средний',
        color: 'var(--priorityMedium)',
    })
    priority.set(Priority.HIGH, {
        value: 'Высокий',
        color: 'var(--priorityHigh)',
    })

    const lowPriority = priority.get(todo.priority);
    const initialValue = lowPriority ? lowPriority : {
        value: 'ошибка',
        color: '#FF0000',
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value; // в формате 'YYYY-MM-DD'
        if (!isNaN(Date.parse(newDate))) {
            setDateRussian(DateUtils.formatUTCToRussian(newDate));
        } else {
            console.warn("Невалидная дата");
        }
    };

    return (
        <div className={styles.EditTodo}>
            EditPage
            <InputApp className={styles.EditTodoTitle} value={todo.title}/>
            <InputApp className={styles.EditTodoDescription} value={todo.description}/>

            <div className={styles.EditTodoProperties}>
                <div className={styles.Date}>
                    <img style={{justifySelf: 'right', alignSelf: 'center'}} src={TimeSvg}/>
                    <div className={styles.Title}>
                        <span style={{fontSize: '20px', fontWeight: 'bold'}}>{dateRussian}</span>
                        <input
                            type='date'
                            defaultValue={DateUtils.formatUTCToInputDate(todo.dateCompleted)}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className={styles.ActionButtons}>
                    <Button size='medium' className={styles.CompletedButton}>Выполнить</Button>
                    <Button size='medium' className={styles.SaveButton}>Сохранить</Button>
                    <Button size='medium' className={styles.DeleteButton}>Удалить</Button>
                </div>

                <div className={styles.Priorities}>
                    <DropDownMenu values={priority} initialValue={initialValue}/>
                </div>
            </div>
        </div>
    )
}
