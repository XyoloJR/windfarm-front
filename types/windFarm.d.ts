export type ItemType = 'WindFarm' | 'Group' | 'WindTurbine' | 'ElectricityMeter';

export interface TreeItem {
  id: string | null;
  expended: boolean;
  name: string;
  selected: boolean;
  type: ItemType;
  children: TreeItem[]
}

export interface WindFarmStoreState {
  farmTree: TreeItem[];
  items: null | Record<string, TreeItem>;
  selectionType: null | ItemType
}
