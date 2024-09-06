import { PropsValue, SingleValue } from 'react-select'

export interface ActionsComponentProps {
  title: string
  subtitle: string
  textButton: string
  hiddeButton?: boolean
  onClickButton: () => void
  onChangeFilterValue: (value: string) => void
  secondaryButtons?: SecondaryButtons[]
}

export interface SecondaryButtons {
  label: string
  onClick: () => void
}

export interface ActivityWithCostToDoItemEstimate {
  _id?: string
  uuid?: string
  description?: string
  unitCost?: number
  quantity?: number
  total?: number
}

export interface VehiculeModel {
  _id?: string
  description: string
}

export interface VehiculeBrands {
  _id: string
  description: string
  models: VehiculeModel[]
}

export interface Client {
  _id: string
  name: string
  type: 'company' | 'person'
  phoneNumber: string
  email: string
  documentId: string
  vehicules: Vehicule[]
  createdAt?: Date
}

export interface NewClientProps {
  lastName: string
  name: string
  type: string
  phoneNumber: string
  email: string
  documentId: string
}

export interface Vehicule {
  _id?: string
  model?: VehiculeModel
  brand?: VehiculeBrands
  type?: 'auto' | 'pickup' | 'ban' | 'truck' | 'motorcycle'
  color?: string
  plate?: string
  motorNumber?: string
  chasisNumber?: string
  km?: number
  year?: number
}

export interface NewVehiculeProps extends Vehicule {
  _id?: string
  clientId?: string | null
  modelId: string | null
  brandId?: string | null
  typeSelections?: string
}

export interface EstimatePropierties {
  _id?: string
  vehicule?: Vehicule
  client?: Client
  activitiesToDo?: ActivityWithCostToDoItemEstimate[]
  requiredParts?: ActivityWithCostToDoItemEstimate[]
  otherRequirements?: ActivityWithCostToDoItemEstimate[]
  externalActivities?: ActivityWithCostToDoItemEstimate[]
  activitiesGroup?: ActivitiesGroupPropierties
  laborCost?: number
  partsCost?: number
  inputCost?: number
  createdAt?: Date | string
  total?: number
}

export interface SelectionProps {
  label: string
  value: string | number
}

export interface SelectorComponentProps {
  value?: PropsValue<SelectionProps> | undefined
  defaultValue?: PropsValue<SelectionProps> | undefined
  placeholder?: string
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isRtl?: boolean
  isSearchable?: boolean
  onChange?: (value: SingleValue<SelectionProps>) => void
  data: SelectionProps[]
  // value?: string | null
}

export interface ModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  children: React.ReactElement,
  iconComponent?: JSX.Element
  title?: string
  subTitle?: string
  textSubmit?: string
  containerClassesNames?: string
  navButtonsOptions?: NavButtonProps
  hiddenButtons?: boolean
  small?: boolean
  medium?: boolean
  big?: boolean
}

export interface NavButtonProps {
  backText?: string
  deleteText?: string
  nextDisabled?: boolean
  renderBack?: boolean
  renderNext?: boolean
  renderConfirmDelete?: boolean
  isFinally?: boolean
  createText?: string
  onNextClick?: () => void
  onBackClick?: () => void
  onSuccess?: () => void
  onDelete?: () => void
}

export interface ObjectPropsTable {
  '__item'?: Object
  [key: string]: any
}

export interface TableProps {
  filter?: string
  data: ObjectPropsTable[]
  renderEnum?: boolean
  renderOptions?: boolean
  options?: TableSubMenuProps[]
  onClickItem?: (item: any) => void
}

export interface TableSubMenuProps {
  label: string
  onClick?: (e: any) => void
}

export interface ResponseAuth {
  _id: string | null
  name: string | null
  email: string | null
  token: string | null
  isRoot?: boolean
  isAdmin?: boolean
  workshop: WorkshopPropierties
}

export interface AttentionsProperties {
  _id?: string
  isLocal: boolean
  isExpress: boolean
  isHome: boolean
  isRescue: boolean
}

export interface PreliminaryManagementProperties {
  _id?: string
  isDiagnosed: boolean
  isProven: boolean
  isKOER: boolean
  isKOEO: boolean
  parked: boolean
  onRoad: boolean
}

export interface AcivitiesProperties {
  _id?: string
  isMaintenance: boolean
  isService: boolean
  isMinorMantenance: boolean
  isPredictive: boolean
  isPreventive: boolean
  isCorrective: boolean
}


export interface ServicesTypesToDoOrderProperties {
  _id?: string
  isMecanic: boolean
  isElectrict: boolean
  isElectroMecanic: boolean
  isElectronic: boolean
  isMultiple: boolean
  isExternal: boolean
}

export interface OrderServicePropierties {
  _id?: string
  attentionType?: AttentionsProperties
  estimateProps?: EstimatePropierties
  preliminarManagment?: PreliminaryManagementProperties
  typesActivitiesToDo?: AcivitiesProperties
  serviceType?: ServicesTypesToDoOrderProperties
  status: 'pending' | 'process' | 'finished' | 'canceled'
  createdAt?: Date
  additionalTask?: ActivityWithCostToDoItemEstimate[]
  findings?: string[]
  resume?: string
  observations?: string[]
  traveled?: DistanceTraveledPropierties
}

export interface OrderStateProps {
  attentionType: AttentionsProperties
  preliminarManagment: PreliminaryManagementProperties
  typesActivitiesToDo: AcivitiesProperties
  serviceType: ServicesTypesToDoOrderProperties
}

export interface DistanceTraveledPropierties {
  distance: number
  type: string | null
}

export interface User {
  _id: string
  name: string
  email: string
  password?: string
  isAdmin: boolean
  isRoot: boolean
  status: 'active' | 'inactive' | 'blocked'
}

export interface WorkshopPropierties {
  _id: string
  name: string
  slogan: string
  location: string,
  representative: string
  ruc: string
  phoneNumber: string,
  pictureUrl: string | null
  administrators?: User[]
  users?: User[]
  createdAt?: Date
}

export interface WorkshopStateProps {
  name: string
  slogan: string
  representative: string
  phoneNumber: string
  location: string
  ruc: string
}

export interface CreateUserProps {
  name: string
  email: string
  password: string
}

export interface ActivitiesGroupPropierties {
  _id: string
  name: string
  activities: string[]
}

export interface PropsResume {
  data: EstimatePropierties
  isEditMode?: boolean
  refetch?: () => void
}

export interface PropsQueryId {
  id?: string
}
