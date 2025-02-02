import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./Quiz.css";
import quizBg from '../assets/Quiz_BG.mp4'; // Import the video

const Quiz = () => {
    // State variables to manage quiz data, current question, score, and UI states
    const [quizData, setQuizData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isoptionSelected, setIsOptionSelected] = useState(false);

    // Fetch quiz data from the server when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                //fetching data indirectly through the dummy api
                const response = await fetch('http://localhost:8000');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                setQuizData(responseData);
            } catch (error) {
                console.error('Error fetching quiz data:', error.message);
            }
        };
        fetchData();
    }, []);

    // Display loading message while quiz data is being fetched
    if (!quizData) return (
        <div className="flex items-center justify-center h-screen">
            <p className="loader-text">Loading...</p>
        </div>
    );


    // Handle answer selection and update score and UI states
    const handleAnswerClick = (option) => {
        const isCorrect = option.is_correct;
        setSelectedOption(option.id);
        setShowCongratulations(isCorrect);
        setIsOptionSelected(true);
        setShowErrorMessage(!isCorrect);

        if (isCorrect) {
            setScore((prevScore) => prevScore + parseFloat(quizData.correct_answer_marks));
        }
        setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, isCorrect]);
    };

    // Get the current question from the quiz data
    const currentQ = quizData.questions[currentQuestion];

    return (
        <div className="quiz-container ">
            {/* Background Video */}
            <video className="" autoPlay loop muted>
                <source src={quizBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for text visibility */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative">
                <h2 className="quiz-title">{quizData.title}</h2>
                <AnimatePresence exitBeforeEnter>
                    {currentQuestion < quizData.questions.length ? (
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }} // Fade-in and fade-out transition
                            className="quiz-card"
                        >
                            {showCongratulations && (
                                <div className="congratulations-message visible">
                                    🎉 Congratulations! you are correct
                                </div>
                            )}
                            {showErrorMessage && !showCongratulations && <div className="error-message">❌ Oops! Incorrect Answer</div>}
                            <h3 className="quiz-question">Question {currentQuestion + 1}</h3>
                            <p className="quiz-question">{currentQ.description}</p>
                            {currentQ.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswerClick(option)}
                                    className={`quiz-option ${selectedOption === option.id
                                        ? option.is_correct
                                            ? 'correct'
                                            : 'incorrect'
                                        : ''
                                        }`}
                                    disabled={isoptionSelected}
                                >
                                    {option.description}
                                </button>
                            ))}
                            <div className="bottom">
                                <div className="left">
                                    <button
                                        onClick={() => setShowSolution(!showSolution)}
                                        className="quiz-option solution-button"
                                    >
                                        See Solution
                                    </button>
                                    {isoptionSelected && showSolution && (
                                        <div className="solution-description">
                                            {currentQ.detailed_solution}
                                        </div>
                                    )}
                                </div>
                                <div className="right">
                                    <button onClick={() => {
                                        setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
                                        setIsOptionSelected(false); // Reset option selected for next question
                                        setShowErrorMessage(false);
                                        setShowSolution(false);
                                        setShowCongratulations(false);
                                    }}
                                        className='quiz-option next-button'>Next</button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            className="quiz-card "
                        >
                            <h2 className="quiz-title">Quiz Completed!</h2>
                            <p className="quiz-summary">Your Score: {score}</p>
                            <h2 className="quiz-summary">Summary:</h2>

                            {selectedAnswers.map((isCorrect, index) => (
                                <p key={index} className="quiz-summary-result">
                                    Question {index + 1}: {isCorrect ? 'Correct 🎉✅' : 'Incorrect ❌'}
                                </p>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Quiz;