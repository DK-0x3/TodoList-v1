import { useState } from 'react';
import './DropDownMenuHover.scss';
import { useTranslation } from 'react-i18next';
import { IDropDownItem } from './interface/IDropDownItem';
import { IDropDownMenuHoverProps } from './interface/IDropDownMenuHoverProps';

export const DropDownMenuHover = (props: IDropDownMenuHoverProps) => {
	const { t } = useTranslation();
	const { className, fnChanged, defaultSelectItem, items } = props;

	const [selectedOption, setSelectedOption] = useState<IDropDownItem>(defaultSelectItem);

	const handleOptionClick = (item: IDropDownItem) => {
		if (fnChanged) {
			fnChanged(item);
		}
		setSelectedOption(item);
	};

	return (
		<div className={`dropDownMenuHover ${className}`}>
			<div className={'select'}>
				<span>{t(selectedOption.text)}</span>
				<ul>
					{
						items.map((item: IDropDownItem) => (
							<li
								key={item.key}
								className={`${
									item.key === selectedOption.key ? 'selected' : ''
								}`}
								onClick={() => handleOptionClick(item)}
							>
								{t(item.text)}
							</li>
						))
					}
				</ul>
			</div>
		</div>
	);
};
