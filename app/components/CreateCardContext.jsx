import React, {createContext, useContext, useState} from 'react';

const CreateCardContext = createContext();


export function CreateCardProvider({childern}){

  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [isFooterChecked, setIsFooterChecked] = useState(false);
  const [inputText, setInputText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [backHeaderImage, setBackHeaderImage] = useState();
  const [backFooterImage, setBackFooterImage] = useState();
  const [scale, setScale] = useState(1);
  const [backScale, setBackScale] = useState(1);
  const [selectButton, setSelectButton] = useState(null);
  const [alignment, setAlignment] = useState('');
  const [footeralignment, setFooteraligmment] = useState(false);
  const [footerFontSize, setFooterFontSize] = useState(16);
  const [selectFontValue, setSelectFontValue] = useState('');
  const [headerFontSize, setHeaderFontSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState('#000');

  
  return(
     <CreateCardContext.Provider 
       value={{
        footerText,
        setFooterText,
        footeralignment,
        setFooteraligmment,
        headerFontSize,
        setHeaderFontSize,
        footerFontSize,
        setFooterFontSize,
        selectFontValue,
        setSelectFontValue,
        selectButton,
        setSelectButton,
        selectedColor,
        setSelectedColor,
        isHeaderChecked,
        setIsHeaderChecked,
        isFooterChecked,
        setIsFooterChecked,
        backHeaderImage,
        setBackHeaderImage,
        backFooterImage,
        setBackFooterImage,
        inputText,
        setInputText,
        alignment,
        setAlignment,
        scale,
        setScale,
        backScale,
        setBackScale,
       }}
     >
     {childern}
     </CreateCardContext.Provider>
  )
}
export function useCreateCard(){
     return useContext(CreateCardContext);
}