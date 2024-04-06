import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import Map from "../components/modules/Map";
import ContactForm from "../components/templates/Contact/ContactForm";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col-reverse items-center gap-6 p-3 lg:flex-row">
        <ContactForm />
        <Map />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
