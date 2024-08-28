import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
const AddScreeningQuestion = ({
  handleClose,
  handleSaveQuestion,
  selectedQuestion,
  handleEditQuestion,
}) => {
  const questionType = [
    {
      name: "Multi choice",
      type: "option",
    },
    {
      name: "Single choice",
      type: "option",
    },
    {
      name: "Yes / No Question",
      type: "boolean",
    },
    {
      name: "Short Answer",
      type: "text",
    },
    {
      name: "Long Answer",
      type: "text",
    },
  ];

  //   const [open, setOpen] = useState(openDialog);

  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionType[0]
  );
  const [question, setQuestion] = useState({
    ...questionType[0],
    id: uuidv4(),
    question: "",
    options: [
      { id: uuidv4(), option: "" },
      { id: uuidv4(), option: "" },
    ],
    required: false,
  });
  const [editQuestion, setEditQuestion] = useState(false);

  const addOptionHandler = () => {
    let temp = JSON.parse(JSON.stringify(question)); // deep copy question;;
    temp.options.push({ id: uuidv4(), option: "" });
    setQuestion({ ...temp });
  };

  const optionRemoveHandler = (option) => {
    let temp = JSON.parse(JSON.stringify(question)); // deep copy question;
    temp.options = temp.options.filter((item) => item.id != option.id);
    setQuestion({ ...temp });
  };

  const optionSetHandler = (option, val) => {
    let temp = JSON.parse(JSON.stringify(question)); // deep copy question;
    temp.options = temp.options.map((item) => {
      if (item.id == option.id) {
        item.option = val;
      }
      return item;
    });
    setQuestion({ ...temp });
  };

  const handleSave = () => {
    if (Object.keys(selectedQuestion || {}).length > 0)
      handleEditQuestion({ old: selectedQuestion, newData: question });
    else handleSaveQuestion(question);
    setSelectedQuestionType(questionType[0]);
    setQuestion({
      id: uuidv4(),
      question: "",
      options: [
        { id: uuidv4(), option: "" },
        { id: uuidv4(), option: "" },
      ],
      name: questionType[0]?.name,
      type: questionType[0].type,
      required: false,
    });
    handleClose();
    //  setOpen(false);
  };

  //   const closeDialog = () => {
  //     setOpen(false);
  //     clearSelectedVal();
  //   };

  useEffect(() => {
    if (editQuestion) return;
    switch (selectedQuestionType?.name) {
      case "Multi choice":
      case "Single choice":
        setQuestion({
          id: uuidv4(),
          question: "",
          options: [
            { id: uuidv4(), option: "" },
            { id: uuidv4(), option: "" },
          ],
          name: selectedQuestionType?.name,
          type: selectedQuestionType.type,
          required: false,
        });
        break;
      case "Yes / No Question":
      case "Short Answer":
      case "Long Answer":
        setQuestion({
          id: uuidv4(),
          question: "",
          name: selectedQuestionType.name,
          type: selectedQuestionType.type,
          required: false,
        });
        break;
      default:
        break;
    }
  }, [selectedQuestionType]);

  useEffect(() => {
    if (Object.keys(selectedQuestion || {}).length > 0) {
      setQuestion(selectedQuestion);
      setSelectedQuestionType({
        name: selectedQuestion?.name,
        type: selectedQuestion?.type,
      });
      setEditQuestion(true);
    }
  }, [selectedQuestion]);

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold">
            Add Screening Questions
          </DialogTitle>
          {/* <DialogDescription className="text-left">
            Candidates will be asked to answer these question before they submit
            their application.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Select
              value={JSON.stringify(selectedQuestionType)}
              onValueChange={(e) => {
                setEditQuestion(false);
                setSelectedQuestionType(JSON.parse(e));
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionType?.map((item, index) => (
                    <SelectItem value={JSON.stringify(item)} key={index}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Label>Mandatory</Label>
              <input
                type="checkbox"
                name=""
                id=""
                className=""
                checked={question?.required}
                onChange={(e) =>
                  setQuestion((que) => ({ ...que, required: e.target.checked }))
                }
              />
            </div>
          </div>

          <form
            className="flex justify-between space-x-2 flex-wrap gap-4"
            //  onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col w-full gap-2">
              <Label className="">Question Text*</Label>
              <textarea
                name="Question"
                id="Question"
                rows={"5"}
                value={question?.question}
                onChange={(e) =>
                  setQuestion((que) => ({ ...que, question: e.target.value }))
                }
                className="p-2 w-full text-sm min-h-10 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="What would you like to ask?"
                //  disabled={saveIsLoading || isLoading}
              ></textarea>
            </div>
            {selectedQuestionType?.type === "option" && (
              <>
                <div className="flex flex-col w-full gap-2">
                  {/* <Label className="">Options*</Label> */}
                  {question?.options?.map((item, index) => (
                    <div key={index} className="flex  gap-5 items-center">
                      <input
                        type="text"
                        name="Option"
                        id="Option"
                        value={item?.option}
                        onChange={(e) => optionSetHandler(item, e.target.value)}
                        className="p-2 w-full text-sm border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#E48C06]"
                        placeholder={`Option ${index + 1}`}
                      />
                      {question?.options?.length > 2 && (
                        <IoMdClose
                          className="cursor-pointer"
                          size={24}
                          onClick={() => optionRemoveHandler(item)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="border px-2 py-1 rounded-md text-blue-500"
                  onClick={addOptionHandler}
                >
                  Add option
                </button>
              </>
            )}
            <div className="flex justify-end w-full">
              <Button
                type="button"
                size="sm"
                className="px-3 py-4 w-[100px]"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </form>
        </div>

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddScreeningQuestion;
