import React from 'react'

const ListInput = ({ category,handlerChecked }) => {


    const handler = category.map(({ id, label }) => {
        return (
            <div className="flex  items-center  direction " key={id}>
                <input type="checkbox" id={id} onChange={handlerChecked} className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor={id}   className="text-gray-600  text=4xl ml-2 cursor-pointer" >{label}</label>
            </div>
        )
    })
    return (
        <div>
            {handler}
        </div>
    )
}

export default ListInput
