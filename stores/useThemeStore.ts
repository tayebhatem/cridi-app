import { create } from "zustand"


interface ThemeState{
    theme:'light'|'dark',
    setTheme:(theme:'light'|'dark')=>void,
}

const useThemeStore=create<ThemeState>((set)=>({
    theme:'light',
    setTheme:( theme:'light'|'dark')=>
     set(() => ({
            theme,
          })),
   

}))