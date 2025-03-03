import React from 'react'
import { FaCheckToSlot, FaListCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";


function Ordercards({ data, count }) {
    const Icon = () => {
        if (data == "Orders Completed") {

            return (
                <div className={` bg-[#035ECF] p-2 flex items-center`}>
                    <FaCheckToSlot className='text-xl text-white' />
                </div>
            )
        }
        if (data == "Orders Confirmed") {
            return (
                <div className={` bg-[#00BA9D] p-2 flex items-center`}>
                    <FaListCheck className='text-xl text-white' />
                </div>
            )
        }
        if (data == "Orders Canceled") {
            return (<div className={` bg-[#FF5470] p-2 flex items-center`}>
                <TiCancel className='text-2xl text-white' />
            </div>)
        }
        if (data == "Orders on Refound") {
            return (<div className={` bg-[#515C6B] p-2 flex items-center`}>
                <MdOutlineSettingsBackupRestore className='text-xl text-white' />
            </div>)
        }
    }

    return (
        <div className=''>
            <div className="flex items-center gap-4 max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <Icon />
                <div>
                    <h5 className=" text-lg font-medium tracking-tight text-gray-900 dark:text-white">{count}</h5>
                    <p className="font-medium text-xs text-gray-700 dark:text-gray-400">{data}</p>
                </div>
            </div>
        </div>

    )
}

export default Ordercards
