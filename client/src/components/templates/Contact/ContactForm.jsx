import { useState } from "react";

import Input from "../../modules/Input";
import Button from "../../modules/Button";
import TextArea from "../../modules/TextArea";

import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");

    if (!name || !email || !number || !message) {
      return false;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          message,
        }),
      });

      if (res.status === 201) {
        toast.success("Message Sent !");
        setTimeout(() => {
          window.location.reload();
        }, 750);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7 w-full">
      <form onSubmit={submitHandler} className="flex flex-col gap-1">
        <h2 className="my-3 font-semibold text-main">
          To contact with us please fill the form
        </h2>
        <Input name="name" placeholder={"Name"} />
        <Input name="email" placeholder={"Email"} />
        <Input name="number" placeholder={"Number"} />
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={"Your message"}
        />
        <Button isDisabled={loading}>
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
