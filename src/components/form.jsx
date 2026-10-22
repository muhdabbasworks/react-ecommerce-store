import { useState } from "react"

export default function ContactForm() {

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitted(true)
        console.log(`{\n\tname: ${nameInput}\n\temail: ${emailInput}\n\tdescription: ${descriptionInput}\n}`)
    };

    if (submitted) return   (
        <div className="form-submitted"><h2>Submitted Successfully</h2></div>
    )

    return (
        <div className="container">
            <section id="contact-form" className="contact-us">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name"
                            placeholder="Enter Your Name"
                            onChange={(e) => setNameInput(e.target.value)}
                            value={nameInput}
                            required
                        />
                    </div>
                    

                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"
                            placeholder="Enter Your Email "
                            onChange={(e) => setEmailInput(e.target.value)}
                            value={emailInput}
                            required
                        />
                    </div>
                    

                    <div className="input-container">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" rows="4"
                            placeholder="Type here"
                            onChange={(e) => setDescriptionInput(e.target.value)}
                            value={descriptionInput}
                            required
                        />
                    </div>

                    <button className="btn-primary1">Submit</button>
                    
                </form>
            </section>
        </div>
    )
}