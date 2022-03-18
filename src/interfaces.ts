export interface Word {
    word : string,
    definition : string
}

export enum Page {
    WordList = 'Word List',
    Playing  = 'Playing',
    WordEdit = 'Word Edit'
}

export type SetStateCallback<State> = (state : State) => State