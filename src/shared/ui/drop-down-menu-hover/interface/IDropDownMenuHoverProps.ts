import { IDropDownItem } from './IDropDownItem';

export interface IDropDownMenuHoverProps {
    defaultSelectItem: IDropDownItem;
    items: IDropDownItem[];
    className?: string;
    fnChanged?: (selectedItem: IDropDownItem) => void;
}