import { SingleValue } from 'react-select'

export interface ActionsComponentProps {
  title: string
  subtitle: string
  textButton: string
  onClickButton: () => void
  onChangeFilterValue: (value: string) => void
}

export interface ActivityWithCostToDoItemEstimate {
  description?: string
  unitCost?: number
  total?: number
}

export interface VehiculeModel {
  _id: string
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

export interface Vehicule {
  _id?: string
  model?: VehiculeModel
  brand?: VehiculeBrands
  type: 'auto' | 'pickup' | 'ban' | 'truck' | 'motorcycle'
  color?: string
  plate?: string
  motorNumber?: string
  chasisNumber?: string
  km?: number
  year?: number
}

export interface EstimatePropierties {
  _id?: string
  vehicule?: Vehicule
  client?: Client
  activitiesToDo?: ActivityWithCostToDoItemEstimate[]
  requiredParts?: ActivityWithCostToDoItemEstimate[]
  otherRequirements?: ActivityWithCostToDoItemEstimate[]
  laborCost?: number
  partsCost?: number
  inputCost?: number
  createdAt?: Date
  total?: number
}

export interface SelectionProps {
  label: string
  value: string | number
}

export interface SelectorComponentProps {
  placeholder?: string
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isRtl?: boolean
  isSearchable?: boolean
  onChange?: (value: SingleValue<SelectionProps>) => void
  data: SelectionProps[]
}

export interface ModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  children: React.ReactElement,
  iconComponent?: JSX.Element
  title: string
  subTitle: string
  textSubmit?: string
  containerClassesNames?: string
  navButtonsOptions: NavButtonProps
}

export interface ActivityWithCostToDoItemEstimate {
  description?: string
  unitCost?: number
  total?: number
}

export interface NavButtonProps {
  backText?: string
  nextDisabled?: boolean
  renderBack?: boolean
  isFinally?: boolean
  createText?: string
  onNextClick?: () => void
  onBackClick?: () => void
  onSuccess?: () => void
}
