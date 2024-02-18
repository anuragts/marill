'use client';

import * as React from 'react';

interface IFileContext {
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
}

export const FileContext = React.createContext<IFileContext | undefined>(undefined);
export const FileProvider = ({ children }:{children:any}) => {
    const [file, setFile] = React.useState('');
  
    return (
    <FileContext.Provider value={{ file, setFile }}>
        {children}
      </FileContext.Provider>
    );
};