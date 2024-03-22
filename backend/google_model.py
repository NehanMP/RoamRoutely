from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("https://huggingface.co/HuggingFaceH4/zephyr-7b-beta")
model = AutoModelForCausalLM.from_pretrained("https://huggingface.co/HuggingFaceH4/zephyr-7b-beta")

input_text = "Generate an Itinerary."
input_ids = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(**input_ids)
print(tokenizer.decode(outputs[0]))