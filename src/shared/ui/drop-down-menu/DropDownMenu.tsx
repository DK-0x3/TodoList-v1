import styles from './DropDownMenu.module.scss';
import {useEffect, useRef, useState} from "react";

export interface IDropDownMenuValue {
    value: string;
    color: string;
}

export interface IDropDownMenuProps<KeyT extends string | number | symbol> {
    values: Map<KeyT, IDropDownMenuValue>;
    defaultOpen?: boolean;
    initialValue: IDropDownMenuValue;
    onSelect?: (key: KeyT, label: IDropDownMenuValue) => void;
}

export const DropDownMenu = <KeyT extends string | number | symbol>(props: IDropDownMenuProps<KeyT>) => {
    const {
        values,
        defaultOpen,
        initialValue,
        onSelect,
    } = props;

    const [isOpen, setIsOpen] = useState(defaultOpen || false);
    const [isTop, setIsTop] = useState(false);
    const [selectedValue, setSelectedValue] = useState<IDropDownMenuValue>(initialValue);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Закрытие меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Определение, открывать ли меню вверх или вниз
    useEffect(() => {
        if (buttonRef.current && menuRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            const spaceAbove = buttonRect.top;
            const spaceBelow = window.innerHeight - buttonRect.bottom;

            setIsTop(spaceAbove > menuRect.height && spaceAbove > spaceBelow);
        }
    }, [isOpen]);

    const handleSelect = (key: KeyT, label: IDropDownMenuValue) => {
        setSelectedValue(label);
        setIsOpen(false);
        if (onSelect) {
            onSelect(key, label);
        }
    };

    return (
        <div ref={dropdownRef} className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
            <button style={{color: selectedValue.color}} ref={buttonRef} onClick={toggleMenu} className={styles['dropdown-button']}>
                {selectedValue.value || 'Настройки'}
            </button>
            {isOpen && (
                <div
                    ref={menuRef}
                    className={`${styles['dropdown-menu']} ${isTop ? styles.top : styles.bottom}`}
                >
                    <ul>
                        {Array.from(values).map(([key, label]) => (
                            <li
                                key={key.toString()}
                                onClick={() => handleSelect(key, label)}
                                className={styles['dropdown-item']}
                                style={{color: label.color}}
                            >
                                {label.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
