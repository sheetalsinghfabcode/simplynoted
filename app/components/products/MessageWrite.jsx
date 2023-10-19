import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { BsXCircle } from "react-icons/bs";

let input, input2, output, output2, outputContainer, outputContainer2, customerid, recipientAddressVal, globalMessData
export function MessageWriting({ show, selectedFile, setSelectedFile, setShowBox, setProductShow,onValueChange,EditMess,editEndMess,shareBoxData}) {
    const [name, setName] = useState(EditMess?EditMess:'')
    const [name2, setName2] = useState(editEndMess?editEndMess:'')
    const [fileData, setFileData] = useState([]);
    const [valToGen, setValToGen] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [aiText, setaiText] = useState('')
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [errorVal, setErrorVal] = useState([]);
    const [clickedItem, setClickedItem] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(false)

    // const [productshow, setProductShow] = useState(true)
    console.log(name, 'Message Text field----');
    // console.log(name, name2, 'ssasasasas');
    input2 = document.querySelector('.inputText2');
    output2 = document.querySelector('.output2');
    outputContainer2 = document.querySelector('.secDiv');
    const maxMessCount = 450
    const remainingWord = maxMessCount - name.length
    const maxSignCount = 50
    const remainSign = maxSignCount - name2.length
    const customStyles = {
        content: {
            top: '60%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '620px',
            background: '#fff',
            width: '100%',
            padding: '30px',
            maxHeight: '500px',
            zIndex: '2',
            position: 'relative'
        },
    };
    async function checkUserLogged() {
        if (!customerid) {
            // console.log(customerid);
            // setProductShow(false)
            alert('please Login First')

        } else if (name.length == 0) {
            alert('Message Can not be empty ')
        } else {
            setProductShow(false)
            console.log(name,'namefield');
        }
    }
    function AfterUpload() {
        if (selectedFile) {
            setShowBox(false)
            return <div className="">
                {/* <div>
                    <h3 className='text-[green]'>Your upload was successful.</h3>
                    <p >Number of recipients uploaded: <span id="card-quantity" ></span></p>
                </div> */}
                <div>
                    {showNextBtn
                        ?

                        <div className='bg-[#1b5299] h-[50px] text-center mt-10'>
                            <button className='text-[#fff] items-center justify-center mt-3 w-full' onClick={() => checkUserLogged()}>Next</button>
                        </div>
                        :
                        <button className="bg-[#ef6e6e] text-[#fff] p-2 rounded" onClick={() => uploadCsvFile()}>
                            Upload
                        </button>
                    }

                </div>
            </div>
        }
        else {
            return <div></div>
        }
    }
    if (input) {
        input.addEventListener('input', processInput);
    }

    function resize_to_fit() {
        let fontSize = window.getComputedStyle(output).fontSize;
        output.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
        console.log(output.clientHeight, "------------", outputContainer.clientHeight);
        if (output.clientHeight >= outputContainer.clientHeight) {
            resize_to_fit();
        }
    }

    async function processInput() {
        // console.log(input.value, "PPPPPPPPPPPPPPPPPPPPPPPPPPP", this.value);

        output.innerHTML = await this.value;
        output.style.fontSize = '60px'; // Default font size
        resize_to_fit();
    }


    function resize_to_fit2() {
        let fontSize = window.getComputedStyle(output2).fontSize;
        output2.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
        // console.log(output2.clientHeight, "------------", outputContainer2.clientHeight);
        if (output2.clientHeight >= outputContainer2.clientHeight) {
            resize_to_fit2();
        }
    }

    async function processInput2() {
        output2.innerHTML = await this.value;
        output2.style.fontSize = output.style.fontSize; // Default font size
        resize_to_fit2();
    }

    if (input2) {
        input2.addEventListener('input', processInput2);
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            const keyToRemove = "Type";
            reader.onload = (e) => {
                const csvData = e.target.result;
                // console.log( csvData,'csVData,0000000000000000');
                let jsonData = csvToJson(csvData);
                console.log(jsonData, 'jsonData^^^^^^^^^^^^^^^^^');

                const cleanedArray = jsonData.map(obj => {
                    const cleanedObj = {};

                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            // Remove outer double quotes using slice
                            cleanedObj[key] = obj[key].slice(1, -1);
                        }
                    }

                    return cleanedObj;
                });

                console.log(cleanedArray, 'cleaned Array');
                let ab = cleanedArray.map((item) => {
                    const newData = { ...item }
                    // console.log(Object.keys(newData),'OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
                    delete newData['"Type"'];
                    // console.log(newData,'&&&&&&&&&&newDataaaaaaaaaaa');
                    return newData
                })

                console.log(ab, 'fiteredDatat,=========');
                setSelectedFile(file); // Update the selected file state
                setFileData(ab);
            };
            reader.readAsText(file);
        }

    };
    function csvToJson(csv) {
        var lines = csv.split('\n');
        var result = [];
        var headers = lines[0].split(',');
        for (var i = 1; i < lines.length; i++) {
            var currentLine = lines[i].split(',');
            // Skip empty lines
            if (currentLine.length === 1 && currentLine[0].trim() === '') {
                continue;
            }
            var obj = {};
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return result;
    }
    async function uploadCsvFile() {
        let aa = []
        let found = false

        setClickedItem(true)
        if (!fileData.length) {
            aa.push('it is empty please add addresses')
            setErrorVal(aa)
            setIsOpen2(true)
            setTimeout(() => setIsOpen2(false), 3000)
            return
        }
        let reqField = ['"First Name"', '"Last Name"', '"Address"', '"City"', '"State/Province"', '"Postal Code"']

        console.log(fileData.length, 'length of addresses');
        const alphabetPattern = /^[A-Za-z]+$/;
        const mailText = /@.*\.com$/

        for (let index = 0; index < fileData.length; index++) {
            const obj = fileData[index];
            const emptyKeys = [];
            const numkeys = []
            let targetField = '"First Name"'
            let emailValid = '"Email"'
            for (const key of reqField) {
                if (obj[key] === "") {
                    emptyKeys.push(key);
                }
            }
            if (alphabetPattern.test(obj[targetField]) == false) {
                aa.push(`'${targetField}' at row ${index} includes a number.`)
                console.log(`Index: ${index}, '${targetField}' includes a number.`);
            }
            if (mailText.test(obj[emailValid]) == false) {
                aa.push(`Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`)
                console.log(`Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`);
                // setIsOpen2(true)
                // setTimeout(() => setIsOpen2(false), 3000)
            }

            if (emptyKeys.length > 0) {
                aa.push(` ${emptyKeys.join(', ')} is empty please check at row ${index}`)
                console.log(`Index: ${index}, Empty Keys: [${emptyKeys.join(', ')}]`, numkeys);
                // setIsOpen2(true)
                // setTimeout(() => setIsOpen2(false), 3000)
                // break;
            }
            if (aa.length > 0) {
                setIsOpen2(true)
                setTimeout(() => setIsOpen2(false), 3000)
                found = true;
            }
        }
        setErrorVal(aa)
        // let ab = fileData.map((item) => {

        //   for (reqField in item) {
        //     console.log(item,')))))))))))))))))))');
        //     if (item[reqField] === '""') {
        //     console.log(item,'------------------');

        //       setIsOpen2(true)
        //       aa.push(`${reqField} is empty please check`)
        //       console.log(`${reqField}`, item[reqField], 'field is empty');
        //       found = true;
        //       break;
        //     }
        //   }
        //   setErrorVal(aa)
        // });
        if (found) {
            console.log(`Found  in the array.`);
        } else {
            console.log(` not found in the array.`);
            // uploadCsvFileOnClick()
        }

    }
    async function uploadCsvFileOnClick() {
        try {
            console.log('uploadCsvFile OnClick');
            // console.log(fileData, 'fileDatatatatatatataat******************');

            const res = await fetch("https://api.simplynoted.com/api/orders/bulk-orders-upload-s3",
                {
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko",
                    },
                    body: JSON.stringify(fileData),
                })
            const json = await res.json();

            console.log(json, 'CSV UPLOAD DATA ---------------');
            if (json.result) {
                setShowNextBtn(true)
            }
        } catch (error) {
            console.log(error, 'file upload error');
        }
    }
    async function onCancl() {
        setIsOpen(false)
        setValToGen(null)
        setaiText(null)
        setValue('abbabbbbb')
    }
    async function onInsetClick() {
        // input.value = aiText
        setName(aiText)
        setIsOpen(false)
        setaiText('')
        setValToGen(null)
    }
    async function aiGenrateMess() {
        try {
            const res = await fetch('https://api.simplynoted.com/api/ai-generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNjZjBiNDAwODcwZjFmMjQ3OTA5ODUiLCJ1c2VyIjp7ImVtYWlsIjoia2FyYW5AdGhlZmFiY29kZS5vcmciLCJzaG9waWZ5SWQiOiI2MjMzNjE5MTAzODQ5IiwiX2lkIjoiNjQzY2YwYjQwMDg3MGYxZjI0NzkwOTg1IiwiZmlyc3RfbmFtZSI6InRlc3RlciIsImxhc3RfbmFtZSI6InRlc3RlciJ9LCJpYXQiOjE2ODE3MzIxNTd9.wFzXMBbN3mSy8nDIlczfkp6m_r1nshHGLCFuLz81Bkc',
                },
                body: JSON.stringify({ msg: valToGen })
            })
            const json = await res.json();
            setaiText(json.message)

            console.log(json.message, 'AiGenrated Response____________');
        } catch (error) {
            console.log(error, "error at Ai generated message ");
        }
    }
    async function onChnageNameVal(nameData) {
        onValueChange(nameData,name2)
        setName(nameData)
        globalMessData = nameData
        console.log(nameData, 'nameData----');
        console.log(input.value,'input',output.style);
        
    }
    async function onchnageOfRegardBox(data){
        setName2(data)
        shareBoxData(data)
    }
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    useEffect(() => {
        input = ref.current;
        output = ref1.current;
        outputContainer = ref2.current;
        customerid = localStorage.getItem('customerId')
    }, [])
    // console.log(bbc, 'bbc--');
    return (
        <>
            <div className='mainDivForBox flex gap-10'>
                <div id="outer" className="outerr">
                    <div className='outerSec' ref={ref2}>
                        <div id='abcd'  ref={ref1} className="output m-5">
                            {name}
                        </div>
                    </div>
                    <div className='secDiv'>
                        <div id='abcd2' className="output2">
                            {name2}
                        </div>
                    </div>

                </div>
                <div className='textAreaView w-[600px]'>
                    <textarea type="text" id="example-one-input" value={name} placeholder="Enter your custom message text here..." ref={ref} className='inputText' maxlength="450" onChange={(e) => onChnageNameVal(e.target.value)} data-gtm-form-interact-field-id="0">
                    </textarea>
                    <span className="charLeft">{remainingWord} characters remaining</span>
                    <div className='flex gap-4 mt-5' >
                        <text className='cursor-pointer' onClick={() => setIsOpen(true)}>Try our new AI Assistant to <br /> help write your message</text>
                        <textarea type="text" value={name2} v-model="keyword" id="example-one-input2" className='inputText2' maxlength="50" onChange={(e) => onchnageOfRegardBox(e.target.value)} placeholder="Enter here..." data-gtm-form-interact-field-id="0">
                        </textarea><br />
                    </div>
                    <span className="charLeft ml-40">{remainSign} characters remaining</span>
                    {show &&
                        <>
                            <div className='w-[263px] mt-10 font-bold'>
                                <text>As of july5,2023, we have upgraded the bulk order template.Please download the new template below</text>
                            </div>

                            <div className='custom_testing'>
                                <div >
                                    <h3 className='font-bold'>Bulk Address Upload</h3>
                                </div>
                                <div>
                                    <div >
                                        <input type="file" name="file" accept=".csv" className="upload-input" onChange={(e) => handleFileChange(e)} />
                                    </div>
                                </div>
                                <p> Download the<a href="https://api.simplynoted.com/docs/bulk-template" className='text-[blue]'> Bulk Order Template</a> </p>
                                <AfterUpload />
                            </div>
                        </>}
                    {!show &&
                        <div className='bg-[#1b5299] h-[50px] text-center mt-10'>
                            <button className='text-[#fff] items-center justify-center mt-3 w-full' onClick={() => checkUserLogged()}>Next</button>
                        </div>
                    }

                </div>
                {/* <input id='customText' className='inputText' type="text" placeholder="Enter your custom text here...." /> */}

            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex'>
                    <h2 className='font-bold text-xl w-[600px]'>AI Message Assistant</h2>
                    <BsXCircle className='' onClick={() => onCancl()} />
                </div>
                <div>
                    <text className=' text-[#999999]'>Type in words or a phrase to use our AI Assistant to<br /> help generate a great message</text>
                </div>
                <div>
                    <textarea type="text" id="aiTextArea" value={aiText ? aiText : valToGen} onChange={(e) => setValToGen(e.target.value)} placeholder="Example: Message for Birthday" maxlength="450"></textarea>
                </div>
                {!aiText ?

                    <div class="ai-generate" >
                        <button id="generate-msg" disabled="" onClick={() => aiGenrateMess()}>Generate Message</button>
                    </div> :
                    <div className='buttonClass flex justify-start'>
                        <div className='buttonDiv pr-5'>
                            <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => onInsetClick()}>Insert</button>
                        </div>
                        <div className='gap-2'>
                            <button className="bg-[#f0f0f0] text-[black] p-2 rounded " onClick={() => onCancl()}>Cancel</button>
                        </div>
                    </div>
                }
            </Modal>
            <Modal
                isOpen={modalIsOpen2}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {errorVal.map((item) =>
                    <div>{item}</div>

                )}
            </Modal>
        </>
    )
}