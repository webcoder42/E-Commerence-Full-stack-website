import React, { useEffect, useState } from 'react';
import Layout from './../../componenets/layout/layout';
import AdminMenu from './../../componenets/layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryForm from '../../componenets/Form/CategoryForm';
import { Modal } from 'antd';







const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name , setName ] =  useState('')
  const [visible , setVisible] = useState(false)
  const [selected , setSelected] = useState(null)
  const [update , setUpdate] = useState('')
  //Handle Form

  const handleSubmit =async (e) =>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category' , {name})
      if (data?.success) {
        toast.success(`${name} is created`)
        getAllCategories()
      }
      else{
         toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something is Wrong in category form')
    }
  }

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category); // Assuming the response has categories data
      } else {
        toast.error('Failed to get categories');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting all categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);


  //update category

  const handleUpdate =async (e)=>{
e.preventDefault()
try {
const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}` , {name : update})
if (data.success) {
  toast.success(`${update} is updated `)
  setSelected(null)
  setUpdate("")
  setVisible(false)
  getAllCategories()
}else{
  toast.error(data.message)
}
} catch (error) {
  toast.error('something went wrong')
}
  };
    //delete category

    const handleDelete =async (id)=>{
      
      try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}` ,)
      if (data.success) {
        toast.success(`category is deleted `)
        
        getAllCategories()
      }else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error('something went wrong')
      }
        };
  return (
    <Layout title={'Dashboard Create Category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
              <CategoryForm handleSubmit= {handleSubmit} value={name} setValue={setName}/> 

            </div>
            <div className='w-76'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                     {categories?.map( c=>(
                  <>
                    <tr>
                      
                      <td key={c._id}>{c.name}</td>
                      <td>
                      <button className='btn btn-primary ms-2'
                       onClick={() => { setVisible(true);
                        setUpdate(c.name);
                        setSelected(c)
                        }}>

                        Edit
                        </button>
                        </td>
                      <td><button className='btn btn-danger ms-2' onClick={() =>{handleDelete(c._id)}}>Delete</button></td>
                    </tr>
                      </>
                     ))}
                  
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={update} setValue={setUpdate} handleSubmit={handleUpdate}/>
            </Modal>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
