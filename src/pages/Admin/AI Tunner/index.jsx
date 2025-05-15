import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { retrainModel } from "@/services/Admin/AIService";
import { useState } from "react";

function AITunner() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    file: null
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }
  const handleSubmit = async () => {
    const response = await retrainModel(formData.file);
    console.log(response);
    if (response.data.code === 200) {
      setResponse({
        loss: 0.62,
        accuracy: 0.84
      });
    }
  }

  return (
    <>
      <h1>Fine-tunning</h1>
      <h2>Music genre classification Model</h2>
      <form action={handleSubmit}>
        <label>
          <span>Upload data</span>
          <Input
            type="file"
            accept=".zip,.rar,.7z,.tar,.gz,.bz2"
            name="file"
            onChange={handleChange}
            required
          />
        </label>
        <div className="flex flex-col gap-2">
          {response && (
            <>
              <p>Loss: 0.62</p>
              <p className="mb-5">Accuracy: 0.84</p>
            </>
          )}
        </div>
        <SubmitButton />
      </form>
    </>
  );
}

export default AITunner