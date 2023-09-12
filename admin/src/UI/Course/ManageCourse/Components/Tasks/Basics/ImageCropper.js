// import { Button } from '@mui/material';
// import React, { useState, useRef, useEffect } from 'react';

// const ImageCropComponent = ({ imageSrc }) => {

//     const mainCanvasRef = useRef(null);
//     const overlayCanvasRef = useRef(null);
//     const CropCanvasRef = useRef(null);
//     const demoCanvasRef = useRef(null);

//     const imageRef = useRef(null);
//     // const [imageSrc, setImageSrc] = useState('');
//     const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
//     const [cropSize, setCropSize] = useState({ width: 0, height: 0 });


//     const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
//     const [isDragging, setIsDragging] = useState(false);


//     const [ratio, setratio] = useState(0);
//     const [cropratio, setcropratio] = useState(0);

//     useEffect(() => {

//         const loadImage = () => {

//             const img = new Image();
//             img.src = imageSrc;

//             img.addEventListener('load', () => {

//                 const mainCanvas = mainCanvasRef.current;
//                 const overlayCanvas = overlayCanvasRef.current;

//                 const ratio = Math.min(mainCanvas.width / img.width, mainCanvas.height / img.height);
//                 const newSize = { width: img.width * ratio, height: img.height * ratio };
//                 const croprectratio = ratio * 5;//Math.min(mainCanvas.width / 750, mainCanvas.height / 422);
//                 const croprectnewSize = { width: (750 * croprectratio), height: (422 * croprectratio) };

//                 // console.log({ croprectnewSize });

//                 setCropPosition({ x: 0, y: 0 });
//                 setratio(ratio);
//                 setcropratio(croprectratio);

//                 setCropSize(croprectnewSize);

//                 mainCanvas.width = newSize.width;
//                 mainCanvas.height = newSize.height;
//                 overlayCanvas.width = newSize.width;
//                 overlayCanvas.height = newSize.height;

//                 const mainCtx = mainCanvas.getContext('2d');
//                 const overlayCtx = overlayCanvas.getContext('2d');

//                 mainCtx.drawImage(img, 0, 0, newSize.width, newSize.height);
//                 overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
//                 drawRectangle(overlayCtx, { x: 0, y: 0 }, croprectnewSize);

//             });

//         };

//         if (imageSrc) {

//             loadImage();

//         }

//     }, [imageSrc]);

//     const handleDragStart = (event) => {
//         setIsDragging(true);
//         const offsetX = event.clientX - overlayPosition.x;
//         const offsetY = event.clientY - overlayPosition.y;
//         setOverlayPosition((prevPosition) => ({
//             ...prevPosition,
//             offsetX,
//             offsetY,
//         }));
//     };

//     const handleDrag = (event) => {
//         if (!isDragging) return;

//         const newPosX = event.clientX - overlayPosition.offsetX;
//         const newPosY = event.clientY - overlayPosition.offsetY;

//         const overlayCanvas = overlayCanvasRef.current;
//         const mainCanvas = mainCanvasRef.current;

//         const maxX = mainCanvas.width - cropSize.width;
//         const maxY = mainCanvas.height - cropSize.height;

//         let restrictedX = newPosX;
//         let restrictedY = newPosY;

//         if (newPosX < 0) {
//             restrictedX = 0;
//         } else if (newPosX > maxX) {
//             restrictedX = maxX;
//         }

//         if (newPosY < 0) {
//             restrictedY = 0;
//         } else if (newPosY > maxY) {
//             restrictedY = maxY;
//         }

//         setOverlayPosition((prevPosition) => ({
//             ...prevPosition,
//             x: restrictedX,
//             y: restrictedY,
//         }));

//         const ctx = overlayCanvas.getContext('2d');
//         ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
//         drawRectangle(ctx, { x: restrictedX, y: restrictedY }, cropSize);
//     };

//     const handleDragEnd = () => {
//         setIsDragging(false);
//         setCropPosition(overlayPosition);
//     };

//     const drawRectangle = (ctx, position, size) => {
//         const { x: offsetX, y: offsetY } = position;
//         const { width: rectWidth, height: rectHeight } = size;

//         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//         // Draw blurred background
//         ctx.filter = 'blur(2px)';
//         ctx.drawImage(mainCanvasRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height);
//         ctx.filter = 'none';

//         // Clear the area inside the rectangle
//         ctx.clearRect(offsetX, offsetY, rectWidth, rectHeight);

//         // Draw rectangle
//         ctx.beginPath();
//         ctx.rect(offsetX, offsetY, rectWidth, rectHeight);
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = 'white';
//         ctx.stroke();
//     };

//     const handleCrop = () => {

//         const canvas = CropCanvasRef.current;
//         const ctx = canvas.getContext('2d');

//         const mainCanvas = mainCanvasRef.current;
//         const mainctx = mainCanvas.getContext('2d');
//         const overlayCanvas = overlayCanvasRef.current;
//         const overlayctx = overlayCanvas.getContext('2d');
//         console.log({ ratio });
//         // console.log({ cropratio });
//         // console.log({ cropSize });
//         // console.log({ cropPosition });
//         // console.log({ overlayPosition });
//         /////////////////////////////////////////////////////////////////////////////////////////////////////
//         const image = new Image();
//         image.src = imageSrc;
//         image.addEventListener('load', () => {

//             // const canvas = CropCanvasRef.current;
//             const demo = demoCanvasRef.current;

//             // const ctx = canvas.getContext('2d');

//             // const mainCanvas = mainCanvasRef.current;
//             // const overlayCanvas = overlayCanvasRef.current;

//             const locratio = Math.min(canvas.width / image.width, canvas.height / image.height);
//             // const newSize = { width: image.width * ratio, height: image.height * ratio };
//             const demonewSize = { width: image.width, height: image.height };
//             // const newSize = { width: canvas.width, height: canvas.height };
//             // const croprectratio = ratio / 1.3;
//             // const croprectnewSize = { width: image.width * croprectratio, height: image.height * croprectratio };

//             // console.log({ croprectnewSize });

//             // setCropPosition({ x: 0, y: 0 });
//             // setratio(ratio);
//             // setcropratio(croprectratio);
//             // setCropSize(croprectnewSize);

//             demo.width = demonewSize.width;
//             demo.height = demonewSize.height;

//             // canvas.width = newSize.width;
//             // canvas.height = newSize.height;
//             // overlayCanvas.width = newSize.width;
//             // overlayCanvas.height = newSize.height;

//             const imgcropsize = { width: (cropSize.width / cropratio), height: (cropSize.height / cropratio) };
//             const imgcroploc = { x: (cropPosition.x / ratio), y: (cropPosition.y / ratio) };

//             console.log({ imgcropsize });
//             console.log({ imgcroploc });

//             // const CropCtx = canvas.getContext('2d');
//             const demoCtx = demo.getContext('2d');
//             demoCtx.drawImage(image, 0, 0, demonewSize.width, demonewSize.height);
//             drawRectangle(demoCtx, { x: imgcroploc.x, y: imgcroploc.y }, imgcropsize);
//             // const overlayCtx = overlayCanvas.getContext('2d');
//             // CropCtx.drawImage(image, imgcroploc.x, imgcroploc.y, 750, 422, 0, 0, newSize.width, newSize.height);
//             // imgcropsize.width, imgcropsize.height,


//             // .drawImage(img, cropPosition.x, cropPosition.y, newSize.width, newSize.height);
//             // overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
//             // drawRectangle(overlayCtx, { x: 0, y: 0 }, croprectnewSize);
//         });

//         //////////////////////////////////////////////////////////////////////////////////////////////////////
//         // const imageData = mainctx.getImageData(cropPosition.x, cropPosition.y, (cropSize.width), (cropSize.height));

//         // canvas.width = imageData.width;
//         // canvas.height = imageData.height;
//         // ctx.putImageData(imageData, 0, 0);

//         // const croppedDataURL = canvas.toDataURL();

//         // console.log({ croppedDataURL });
//         //////////////////////////////////////////////////////////////////////////////////////////////////////
//         // const { x, y, width: cropSize.width, height: cropSize.height };
//         // const image = new Image();
//         // image.src = imageSrc;

//         // console.log({ image });
//         // console.log({ cropSize });
//         // ctx.drawImage(image, (cropPosition.x * cropratio), (cropPosition.y * cropratio), cropSize.width * cropratio, cropSize.height * cropratio, 0, 0);

//         // ctx.drawImage(image, (cropPosition.x * cropratio), (cropPosition.y * cropratio), cropSize.width * cropratio, cropSize.height * cropratio, 0, 0, cropSize.width * cropratio, cropSize.height * cropratio);

//         // image.addEventListener('load', () => {

//         //     const canvas = CropCanvasRef.current;
//         //     // const ctx = canvas.getContext('2d');

//         //     const mainCanvas = mainCanvasRef.current;
//         //     const overlayCanvas = overlayCanvasRef.current;

//         //     // const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
//         //     const newSize = { width: image.width * ratio, height: image.height * ratio };
//         //     // const croprectratio = ratio / 1.3;
//         //     // const croprectnewSize = { width: img.width * croprectratio, height: img.height * croprectratio };

//         //     // console.log({ croprectnewSize });

//         //     // setCropPosition({ x: 0, y: 0 });
//         //     // setratio(ratio);
//         //     // setcropratio(croprectratio);
//         //     // setCropSize(croprectnewSize);

//         //     canvas.width = newSize.width;
//         //     canvas.height = newSize.height;
//         //     // overlayCanvas.width = newSize.width;
//         //     // overlayCanvas.height = newSize.height;

//         //     const CropCtx = canvas.getContext('2d');
//         //     // const overlayCtx = overlayCanvas.getContext('2d');
//         //     CropCtx.drawImage(image, 0, 0, (cropPosition.x), (cropPosition.y),
//         //         newSize.width, newSize.height,
//         //         // (cropSize.width * cropratio), (cropSize.height * cropratio),
//         //         0, 0, newSize.width, newSize.height);

//         //     // .drawImage(img, cropPosition.x, cropPosition.y, newSize.width, newSize.height);
//         //     // overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
//         //     // drawRectangle(overlayCtx, { x: 0, y: 0 }, croprectnewSize);
//         // });

//     };

//     return (

//         <div

//             width="500px"
//             height="450px"
//             style={{
//                 position: 'relative',
//                 minWidth: '300px', maxWidth: "500px",
//                 maxHeight: "450px", minHeight: "250px",
//                 border: "1px solid"
//             }}>

//             <canvas id="main-canvas"
//                 ref={mainCanvasRef}
//                 width="500px"
//                 height="450px"
//                 style={{
//                     minWidth: '300px', maxWidth: "500px",
//                     minHeight: "250px", maxHeight: "450px",
//                     border: "1px solid yellow",
//                     position: "relative",
//                     zIndex: 1
//                 }}>
//             </canvas>

//             <canvas
//                 id="overlay-canvas"
//                 ref={overlayCanvasRef}
//                 onMouseDown={handleDragStart}
//                 onMouseMove={handleDrag}
//                 onMouseUp={handleDragEnd}
//                 onMouseLeave={handleDragEnd}
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 2,
//                     border: "1px solid green"
//                 }}>
//             </canvas>

//             <Button color='firr' variant='contained' onClick={(event) => { handleCrop(event) }}>Crop</Button>

//             <canvas
//                 id="Crop-canvas"
//                 ref={CropCanvasRef}
//                 width="750px"
//                 height="422px"
//                 style={{
//                     minWidth: '750px', maxWidth: "850px",
//                     minHeight: "422px", maxHeight: "522px",
//                     border: "1px solid yellow",
//                     position: "relative",
//                 }}
//             ></canvas>

//             <canvas
//                 id="demo-canvas"
//                 ref={demoCanvasRef}
//                 width="750px"
//                 height="422px"
//                 style={{
//                     border: "1px solid yellow",
//                     position: "relative",
//                 }}
//             ></canvas>

//         </div>

//     );

// };

// export default ImageCropComponent;
//////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useRef, useEffect } from 'react';

const ImageCropComponent = ({ imageSrc }) => {
    const firstCanvasRef = useRef(null);
    const secondCanvasRef = useRef(null);
    const thirdCanvasRef = useRef(null);

    useEffect(() => {
        const firstCanvas = firstCanvasRef.current;
        const secondCanvas = secondCanvasRef.current;
        const thirdCanvas = thirdCanvasRef.current;
        const firstContext = firstCanvas.getContext('2d');
        const secondContext = secondCanvas.getContext('2d');

        // Load the selected image onto the first canvas
        // Replace 'selectedImage' with the actual image source
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            firstCanvas.width = firstCanvas.parentNode.clientWidth;
            firstCanvas.height = firstCanvas.parentNode.clientHeight;
            firstContext.drawImage(image, 0, 0, firstCanvas.width, firstCanvas.height);
        };

        // Configure the second canvas for dragging
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        secondCanvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        });

        secondCanvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const { width, height } = firstCanvas.getBoundingClientRect();
            const x = e.clientX - offsetX - width / 2;
            const y = e.clientY - offsetY - height / 2;

            // Ensure the second canvas stays within the boundaries of the first canvas
            const maxX = firstCanvas.width - secondCanvas.width;
            const maxY = firstCanvas.height - secondCanvas.height;
            const clampedX = Math.max(0, Math.min(maxX, x));
            const clampedY = Math.max(0, Math.min(maxY, y));

            // Update the position of the second canvas
            secondCanvas.style.left = `${clampedX}px`;
            secondCanvas.style.top = `${clampedY}px`;

            // Clear the second canvas and draw the selected area
            secondContext.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
            secondContext.drawImage(firstCanvas, clampedX, clampedY, secondCanvas.width, secondCanvas.height, 0, 0, secondCanvas.width, secondCanvas.height);
        });

        secondCanvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Handle crop button click
        const cropButton = document.getElementById('cropButton');
        cropButton.addEventListener('click', () => {
            const { width, height } = secondCanvas;
            const croppedImage = secondContext.getImageData(0, 0, width, height);

            // Display the cropped image on the third canvas
            thirdCanvas.width = width;
            thirdCanvas.height = height;
            thirdCanvas.getContext('2d').putImageData(croppedImage, 0, 0);
        });
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <canvas ref={firstCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            <canvas ref={secondCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            <canvas ref={thirdCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            <button id="cropButton">Crop Image</button>
        </div>
    );
};

export default ImageCropComponent;


