// const payBtn = document.querySelector(".checkout-btn");

// payBtn.addEventListener("click", async () => {
//     try {
//         const response = await fetch("/mongodb-checkout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 items: JSON.parse(localStorage.getItem('cart'))
//             }),
//         });

//         const data = await response.json();

//         if (data.url) {
//             window.location.href = data.url;
//         } else {
//             console.error("Invalid URL Received from the server:", data.url);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });
