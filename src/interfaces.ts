export interface Word {
    word : string,
    definition : string,
    included : boolean
}

export enum Page {
    WordList = 'Word List',
    Playing  = 'Playing',
    WordEdit = 'Word Edit'
}