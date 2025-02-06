import { useEffect, useState } from "react";
import "../css/riddle.css";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getRandomRiddle } from "../redux/slices/riddleSlice";
import levenshtein from "fast-levenshtein"; // Levenshtein eklendi

const API_URL =
  "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";
const API_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN; // API Token'ı buraya ekle

function Riddle() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomRiddle());
  }, []);

  const { wholeRiddle } = useSelector((store) => store.riddle);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?]/g, "")
      .replace(/\s+/g, " ");
  };

  const checkAnswer = async () => {
    const userAnswer = normalizeText(inputValue);
    const correctAnswer = normalizeText(wholeRiddle.answer);

    // 🔹 Eğer Levenshtein mesafesi 0 ise direkt doğru kabul et
    const distance = levenshtein.get(userAnswer, correctAnswer);
    console.log("Levenshtein mesafesi:", distance);
    console.log("Hugging Face Token:", import.meta.env.VITE_HUGGING_FACE_TOKEN);

    if (distance === 0) {
      console.log("✅ Levenshtein ile tam eşleşme!");
      setIsCorrect(true);
      return;
    }

    // 🔹 Hugging Face API çağrısı yap
    const data = {
      inputs: {
        source_sentence: correctAnswer,
        sentences: [userAnswer],
      },
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });

      const result = await response.json();
      console.log("Benzerlik Skoru:", result[0]);

      if (result[0] >= 0.85) {
        console.log("✅ Cevap doğru!");
        setIsCorrect(true);
      } else {
        console.log("❌ Cevap yanlış!");
        setIsCorrect(false);
      }
    } catch (error) {
      console.error("API hatası:", error);
    }
  };

  return (
    <div className="cerceve-main">
      <textarea
        className="form-control-riddle"
        type="text"
        value={wholeRiddle.riddle}
        aria-label="readonly input example"
        readOnly
      />
      <div>
        <input
          className="form-control form-control-lg-answer"
          type="text"
          placeholder="Cevabınızı giriniz."
          aria-label=".form-control-lg example"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <CustomButton text="Cevapla" onClick={checkAnswer} />
      </div>
      {isCorrect !== null && (
        <p style={{ fontWeight: "bold", color: isCorrect ? "green" : "red" }}>
          {isCorrect ? "Doğru! ✅" : "Yanlış ❌"}
        </p>
      )}
    </div>
  );
}

export default Riddle;
