export default interface InputModel {
    name: string, 
    label: string, 
    error: string, 
    options?: {_id: string, name: string}[],
    [x: string]: any
}