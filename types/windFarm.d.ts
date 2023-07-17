export interface TreeItem {
  id: string | null;
  expended: boolean;
  name: string;
  selected: boolean;
  type: 'WindFarm' | 'Group' | 'WindTurbine' | 'ElectricityMeter';
  children: TreeItem[]
}

export interface WindFarmStoreState {
  farmTree: TreeItem[];
  items: null | Record<string, TreeItem>;
}
