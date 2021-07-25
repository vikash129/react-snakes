import React from 'react'
import { useState, useRef } from 'react'

export const Login = () => {

    const [image, setImage] = useState('')
    const imageRef = useRef(null)

    function useDisplayImage() {
        const [result, setResult] = useState('')

        function uploader(e) {
            const imageFile = e.target.files[0]

            const reader = new FileReader()

            reader.addEventListener('load', (e) => {
                setResult(e.target.result)
            })
            reader.readAsDataURL(imageFile);

        }
        return { result, uploader };
    }
    const { result, uploader } = useDisplayImage();

    return (

        <div>

            <div class="form-group">
                <label for="img">click to login</label>
                <input type="file" class="form-control-file" name="" id="img" placeholder="" aria-describedby="fileHelpId" onChange={
                    (e) => {
                        setImage(e.target.files[0]);
                        uploader(e)
                    }}/>
            </div>

                <br></br>
                {result && <img ref={imageRef} src={result} alt="" />}
        </div>
            )
}
