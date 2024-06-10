import styled, {css} from "styled-components";
import {useState} from "react";
import Label from "./Label.jsx";
import Input from "./Input.jsx";
import TextArea from "./TextArea.jsx";
import toast from "react-hot-toast";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 540px;
  height: 110px;
  background: var(--color-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: none;
  transition: 0.5s;

  & > p {
    font-size: clamp(2.125rem, 1.5968rem + 1.6901vw, 3.625rem);
    font-family: "Fixel Extra-Bold", serif;
    padding-top: 6px;

  }

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background: var(--color-yellow);
    color: var(--color-black);

    & > p {
      color: var(--color-black);
    }

    & svg {
      stroke: var(--color-black);
    }
  }

  ${props => props.active === "true" && css`
    background: var(--color-yellow);
    color: var(--color-black);
  `}
`

const Form = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isHover, setHover] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (firstName === "") {
            toast.error("Please provide your name")
            return
        }

        if (secondName === "") {
            toast.error("Please provide your surname")
            return
        }

        if (email === "") {
            toast.error("Please provide your phone")
            return
        }

        if (email === "") {
            toast.error("Please provide your email")
            return
        }

        if (!emailPattern.test(email)) {
            toast.error("Please provide your real email")
            return
        }

        const data = {
            name:`${firstName} ${secondName}`,
            email,
            comment: message
        };

        const url = import.meta.env.VITE_CONTACT_URL
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("We received your message, wait for a reply");
                setIsSent(true);
            } else {
                console.error('Failed to send data to the server');
            }

        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setFirstName("")
            setSecondName("")
            setEmail("")
            setMessage("")
            setNumber("")
        }
    }

    return (
        <Container>
            <Column>
                <Label>First Name</Label>
                <Input
                    type="text"
                    value={firstName}
                    onChange={(value) => setFirstName(value)}
                    placeholder="First Name"
                />
            </Column>
            <Column>
                <Label>Second Name</Label>
                <Input
                    type="text"
                    value={secondName}
                    onChange={(value) => setSecondName(value)}
                    placeholder="Second Name"
                />
            </Column>
            <Column>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(value) => setEmail(value)}
                    placeholder="example@gmail.com"
                />
            </Column>
            <Column>
                <Label>Phone Number</Label>
                <Input
                    type="text"
                    value={number}
                    onChange={(value) => setNumber(value)}
                    placeholder="xxxxxxxxxxx"
                />
            </Column>
            <Column>
                <Label>Your Message</Label>
                <TextArea
                    value={message}
                    onChange={(value) => setMessage(value)}
                    placeholder="Hello, I would like to get in touch for more information about your service. I would appreciate the opportunity to discuss the details."
                />
            </Column>
            <Button onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    disabled={isSent}
                    onClick={(e) => handleSubmit(e)}
                    active={isSent ? "true" : "false"}>
                <p>Send Enqury</p>
                {isHover
                    ?
                    <img src="/architecture/contact/arrow-up-right-dark.svg" alt="arrow"/>
                    :
                    <img src="/architecture/contact/arrow-up-right.svg" alt="arrow"/>}
            </Button>
        </Container>
    );
};

export default Form;
