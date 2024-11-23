/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getpost, deletePost } from "./Api/postapi";
import { toast } from "react-toastify";
import FormForPost from "./component/form/Form";

function App() {



  const [data, setData] = useState([]);
  const [isUpdated,setIsUpDated]=useState({})
  const getPostData = async () => {
    try {
      const res = await getpost("/posts");
      setData(res.data);
    } catch (err) {
      console.log(err.message, "your error");
    }
  };

  useEffect(() => {
    getPostData();
    
  }, []);

  //  delete
  const handleDelete = async (id) => {
    const res = await deletePost(id);
    try {
      if (res.status === 200) {
        const updatedData = data.filter((el) => el.id !== id);
        setData(updatedData);
      }
    } catch (err) {
      console.log(err);
    }
  };
// update value


const handleUpdatePost=(el)=>setIsUpDated(el)





  return (
    <>
      <section>
        <FormForPost data={data} setData={setData} isUpdated={isUpdated} setIsUpDated={setIsUpDated} />
      </section>
      <div className="grid grid-cols-5 gap-2 bg-black">
        {data.map((el) => {
          return (
            <div
              key={el.id}
              style={{
                border: "2px solid green ",
                margin: 10,
                padding: "15px",
                color: "white",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "15px",
              }}
              className="shadow-lg shadow-white blur-1"
            >
              <div className=" text-[24px] font-[600] text-[yellow]">
                {" "}
                {el.id}
              </div>
              Title:=={el.title}
              <br />
             {/* body--- {el.body.slice(0,10)} */}
              <div className="flex justify-between items-end ">
                <button
                  onClick={() => handleDelete(el.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-black hover:text-white"
                >
                  DELETE
                </button>
                <button onClick={(()=>handleUpdatePost(el))} className="bg-gray-200 p-2 rounded text-black hover:bg-blue-700 hover:text-white ">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
