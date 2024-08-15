export interface ActionsComponentProps {
  title: string
  subtitle: string
  onClickButton: () => void
  onChangeFilter: (value: string) => void
}