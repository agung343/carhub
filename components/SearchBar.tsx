'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import SearchManufacturer from "./SearchManufacturer"
import { manufacturers } from '../constants/index';

export default function SearchBar() {
    const router = useRouter()

    const [manufacturer, setManufacturer] = useState("")
    const [model, setModel] = useState("")

    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (manufacturer === "" && model === "") {
            return alert("Please fill in search bar")
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search)

        if (model) {
            searchParams.set("model", model)
        } else {
            searchParams.delete("model")
        }

        if (manufacturer) {
            searchParams.set("manufacturer", manufacturer)
        } else {
            searchParams.delete("manufacturer")
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`
        return router.push(newPathname)
    }

    const SearchButton = ({otherClasses}: {otherClasses: string}) => (
        <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
            <Image src="/magnifying-glass.svg" alt="magnifify" width={40} height={40} className="object-contain" />
        </button>
    )

    return (
        <form className="searchbar" onSubmit={searchSubmit}>
            <div className="searchbar__items">
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
                <SearchButton otherClasses="sm:hidden"/>
            </div>
            
            <div className="searchbar__item">
                <Image src="/model-icon.png" width={25} height={25} className="absolute w-5 h-5 ml-4" alt="car-model" />
                <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Tiguan" className="searchbar__input" />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}