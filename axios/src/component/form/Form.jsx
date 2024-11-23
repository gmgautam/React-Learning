/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { postData, upDatePost } from "../../Api/postapi";
import { useEffect } from "react";
const FormForPost = ({ data, setData, isUpdated, setIsUpDated }) => {
  //  intial value for th form
  const initialValue = {
    title: "",
    body: "",
  };

  // useForm hook------->
  const { handleSubmit, reset, register, setValue, getValues } = useForm({
    defaultValues: initialValue,
  });

  // condital functions
  let isEmpty = Object.keys(isUpdated).length === 0;

  // --------------

  const updateData = async () => {
    const data = getValues();
    let newUpdatedDta = { ...data, id: isUpdated.id, userId: 1 };
    console.log(newUpdatedDta);
    try {
      const res = await upDatePost(isUpdated.id, getValues());
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currel) =>
            currel.id === res.data.id ? res.data : currel
          );
        });
        setIsUpDated({});
      } else {
        console.log("nalo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // subnmit form function 
  const submitData = async (data2, event) => {
    const action = event.nativeEvent.submitter.value;
    if (action === "Add") {
      let lastId = data.length + 1;

      const newDta = { ...data2, id: lastId };

      try {
        const res = await postData(newDta);
        if (res.status === 201) {
          console.log("Entered IF");
          setData([...data, newDta]);
        }
        reset();
      } catch (err) {
        console.log(err);
      }
    } else if (action === "Edit") {
      updateData();
    }
  };

  // updated the post
  useEffect(() => {
    if (isUpdated) {
      setValue("title", isUpdated?.title ?? "");
      setValue("body", isUpdated?.body ?? "");
    }
  }, [isUpdated, setValue]);
  return (
    <div>
      <div className="flex justify-center border p-5">
        <form action="" className="p-2" onSubmit={handleSubmit(submitData)}>
          <label htmlFor="name">title</label>
          <input
            className="border border-black m-2"
            type="text"
            name="title"
            id="title"
            {...register("title", { required: true })}
          />
          <label htmlFor="post">body</label>
          <input
            className="border border-black m-2"
            type="text"
            name="body"
            id="body"
            {...register("body", { required: true })}
          />
          <button
            type="submit"
            className="border p-2 w-[100px] rounded bg-green-500"
            value={isEmpty ? "Add" : "Edit"}
          >
            {isEmpty ? "Add" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormForPost;
