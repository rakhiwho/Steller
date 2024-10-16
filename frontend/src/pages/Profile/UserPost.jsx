
import React, { useContext, useState } from 'react'
 
import UseGetPost from '../../hooks/useGetPost';
import PostLayout from '../Home/post/postLayout';
import { context } from '../../hooks/Context';
 

function UserPost({id}) {
  const {darkTheme}= useContext(context)
console.log(id)

  const {data , loading }= UseGetPost(id);


 return (<>
 

<div className={` ${!darkTheme ?'bg-indigo-900 text-slate-300':''} user_post   rounded-3xl text-black`}>
 

{
  Array.isArray(data)?
   data.map((data)=>(
    !data ?[] : <div key={data?._id}>

<PostLayout  data={data}    />
    </div>)
   ) : <span className={`{!darkTheme ?'text-slate-300':''} ml-4 `}>no posts yet</span>}
  

</div>

 </>
  )
}


export default UserPost
