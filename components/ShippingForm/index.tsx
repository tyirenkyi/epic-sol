import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//components
import FormInput from "../FormInput";

interface Props {
  onSubmit: (form) => void;
  user?: any;
}

const ShippingForm = ({ onSubmit, user } : Props) => {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [suite, setSuite] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postal, setPostal] = useState<string>("");

  const generateForm = () => (
    {firstName, lastName, address, suite, city, 
      country, postalCode: postal, email: session.user.email}
  )

  const submitForm = () => {
    onSubmit(generateForm());
  }

  const populateFields = () => {
    const names = user.name.split(" ");
    setFirstName(names[0]);
    setLastName(names[1]);
    setAddress(user.Address.address);
    setSuite("");
    setCity(user.Address.City);
    setCountry(user.Address.Country);
    setPostal(user.Address.postal_code);
  }

  useEffect(() => {
    if(user && user.Address) 
      populateFields()
  }, [])

  useEffect(() => {
    if(firstName.length > 0 && lastName.length > 0 && city.length > 0 
      && address.length > 0 && country.length > 0 && postal.length > 0)
      setDisabled(false)
    else
      setDisabled(true);
  }, [firstName, lastName, city, address, suite, country, postal])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className="flex flex-row items-center pr-4 mt-4 space-x-4"
      >
        <FormInput 
          label="First Name"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput 
          label="Last Name"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6">
        <FormInput 
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Apt., suite"
          name="apt"
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
        />
      </div>
      <div
        className="flex flex-row items-center pr-4 mt-6 space-x-4"
      >
        <FormInput 
          label="City, State"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormInput 
          label="Country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Postal code"
          name="postal"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-center">
        <button
          disabled={disabled}
          onClick={submitForm}
          className={`mx-auto mt-8 ${disabled ? "bg-appGray" : "bg-appBlue"} text-appGray2 w-full h-[55px] uppercase tracking-widest rounded text-[12px] font-semibold`}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ShippingForm;
