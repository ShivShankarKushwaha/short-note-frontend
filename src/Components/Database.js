// getting and updating data in database
import React, { useEffect, useState } from 'react'

function Database() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [message, setmessage] = useState('');
    const [array, setarray] = useState([]);
    const [getcheck, setcheck] = useState(false);
    async function setdata() {
        const option = {
            method: 'POST',
            body: new URLSearchParams({ 'name': name, 'email': email, 'message': message })
        };
        fetch('http://localhost:5500/setdata', option)
            .then(responce => responce.json())
            .then(result => {
                console.log(result);
                if (result.status == 201) {
                    setname('');
                    setemail('');
                    setmessage('');
                    setcheck(!getcheck)
                }
                else if (result.status == 406) {
                    alert('all fields are required');
                }
                else {
                    alert('something wrong happend')
                }
            })
            .catch(err => { throw err })
    }
    useEffect(() => {
        let arr = [];
        function getdata() {
            fetch("http://localhost:5500/getdata")
                .then(result => result.json())
                .then(responce => { console.log(responce); setarray(JSON.parse(responce)) })
        }
        getdata();
    }, [getcheck])
    function deletedata(e) {
        const option = {
            method: 'DELETE',
            body: new URLSearchParams({ email: e.target.value })
        };
        fetch('http://localhost:5500/deletedata', option)
            .then(responce => responce.json())
            .then(result => {
                console.log(result);
                setcheck(!getcheck);
            })
            .catch(err => { throw err })
    }
    function deleteall()
    {
        let test = window.confirm("Are you sure you want to Delete all?");
        if(!test)
        {
            return;
        }
        const option={
        method:'POST',
        body: new URLSearchParams({param:'data'})
        };
        fetch('http://localhost:5500/deleteall',option)
        .then(responce=>responce.json())
        .then(result=>
        {
            console.log(result)
            if(result.status==200)
            {
                setcheck(!getcheck);
            }
            else
            {
                alert('Data not deleted')
            }
        })
        .catch(err=>{console.log(err);})
    }
    function editdata(e) {
        let editedmessage = prompt('Enter Message');
        console.log(editedmessage);
        const option = {
            method: 'PUT',
            body: new URLSearchParams({ email: e.target.value, message: editedmessage })
        };
        fetch('http://localhost:5500/edit', option)
            .then(responce => responce.json())
            .then(result => {
                console.log(result)
                if (result.status == 200) {
                    setcheck(!getcheck);
                }
                else {
                    alert('not updated')
                }
            })
            .catch(err => { alert('some error occured') })

    }
    return (
        <div>
            {/* <div className='w-1/2 mx-auto p-10 flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Setdata in database</h1>
            <input className='w-full h-10 border-slate-300 border-2 p-2 text-xl text-blue-600 m-3' type="text" name='name' placeholder='Enter name' value={name} onChange={(e)=>{setname(e.target.value)}} />
              <input className='w-full h-10 border-slate-300 border-2 p-2 text-xl text-blue-600 m-3' type="text" name='email' placeholder='Enter email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
              <input className='w-full h-10 border-slate-300 border-2 p-2 text-xl text-blue-600 m-3' type="text" name='message' placeholder='Enter message' value={message} onChange={(e)=>{setmessage(e.target.value)}} />
            <button className='text-xl text-white bg-black p-3 active:p-2' onClick={setdata}>Save</button>
        </div> */}
            <div className='w-1/2 flex justify-center items-center flex-col mx-auto'>
                <h1 className='text-center text-2xl font-bold'>These are data in database</h1>
                <table className='table table-auto'>
                    <thead className='w-full'>
                        <tr className='w-full border-2 font-bold text-xl'>
                            {/* <td className='border-4 p-1'>Id</td> */}
                            <td className='border-4 p-1'>Name</td>
                            <td className='border-4 p-1'>Email</td>
                            <td className='border-4 p-1'>Message</td>
                            <td className='border-4 p-1'>Control data</td>
                            <td className='border-4 p-1'>Modify Message</td>

                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        <tr className='border-2'>
                            <td className='border-2 p-1'>
                                <input className=' h-10 border-slate-300 border-2 p-2 text-xl text-blue-600 ' type="text" name='name' placeholder='Enter name' value={name} onChange={(e) => { setname(e.target.value) }} />
                            </td>
                            <td className='border-2 p-1'>
                                <input className=' h-10 border-slate-300 border-2 p-2 text-xl text-blue-600 ' type="text" name='email' placeholder='Enter email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                            </td>
                            <td className='border-2 p-1'>
                                <input className=' h-10 border-slate-300 border-2 p-2 text-xl text-blue-600' type="text" name='message' placeholder='Enter message' value={message} onChange={(e) => { setmessage(e.target.value) }} />
                            </td>
                            <td className='border-2 p-1'><button className='text-white bg-blue-800 text-lg font-bold p-2' onClick={setdata}>Add</button></td>
                            <td className='border-2 p-1'><button className='text-white bg-indigo-600 text-lg p-1 active:p-0 py-2 active:text-sm' onClick={deleteall}>Delete all</button></td>
                        </tr>
                        {array.map((item, i) =>
                            <tr key={i} className='border-2'>
                                {/* <td className='border-2 p-1'>{item.Id}</td> */}
                                <td className='border-2 p-1'>{item.name}</td>
                                <td className='border-2 p-1'>{item.email}</td>
                                <td className='border-2 p-1'>{item.message}</td>
                                <td className='border-2'><button className='text-white bg-slate-600 p-2 active:p-1' value={item.email} onClick={(e) => { deletedata(e) }}>Delete</button></td>
                                <td className='border-2'><button className='text-white text-bg bg-green-700 p-2 active:p-1' value={item.email} onClick={(e) => { editdata(e) }}>Edit</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Database;