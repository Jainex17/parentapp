
export const Model = ({status,setclose,bottomCloseBtn=false,children}) => {

  const handleModelClose = () => {
    const model = document.getElementById('model');
    const modelback = document.getElementById('modelback');

    model.classList.remove('modelin');
    model.classList.add('modelout');

    modelback.classList.remove('modelbgin');
    modelback.classList.add('modelbgout');

    setTimeout(() => {
      setclose(false);
    }, 100);  
  }

  return <>
    <div className={`fixed inset-0 z-50 flex items-center justify-center `}>
        <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30 z-10 modelbgin" id="modelback" onClick={handleModelClose}></div>
        <div className={`w-full max-w-md p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-800 z-20 modelin`} id="model">
            {children}  
            {bottomCloseBtn &&
              <div className="flex justify-center my-2">
                <button className=" bg-blue-600 px-10 py-3 font-bold text-white hover:bg-blue-600/90 rounded-full active:bg-blue-600/75" onClick={handleModelClose}>Done</button>
              </div>
            }
        </div>
    </div>
  </>;
};
