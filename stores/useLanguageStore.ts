import { languageData } from "@/constants/Language";
import { LanguageType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";


interface LanguageState{
    language:LanguageType | null,
    setLanguage:(language:LanguageType)=>void
}

const useLanguageStore=create<LanguageState>( (set)=>({
    language:languageData[1],
    setLanguage:async(language:LanguageType)=>{
        try {
            // Save the language id to AsyncStorage
            await AsyncStorage.setItem('language', language.id);

            // Update the store
            set(() => ({
                language
            }));
        } catch (error) {
            console.error("Error saving language to AsyncStorage", error);
        }

    }

    }))

export default useLanguageStore