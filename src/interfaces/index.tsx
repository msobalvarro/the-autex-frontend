export interface ActionsComponentProps {
  title: string
  subtitle: string
  textButton: string
  onClickButton: () => void
  onChangeFilter: (value: string) => void
}