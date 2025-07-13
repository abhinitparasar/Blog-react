import envVariable from "./conf/conf.js"
import './App.css'

function App() {
  console.log(envVariable.appwriteUrl);
  console.log(envVariable.appwriteProjectId);
  console.log(envVariable.appwriteDatabaseId);
  console.log(envVariable.appwriteCollectionId);
  console.log(envVariable.appwriteBucketId);

  return (
    <>
      <p>hi</p>
    </>
  )
}

export default App
