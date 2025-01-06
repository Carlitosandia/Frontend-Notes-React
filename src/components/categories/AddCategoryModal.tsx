import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Category, Note } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addCategoryToNote } from "@/api/NotesAPI";

type categoriesProps = {
  categories: Category[];
};

export default function AddCategoryModal({ categories }: categoriesProps) {
  const [notesCategories, setNotesCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories) {
      setNotesCategories(categories); // Actualiza el estado cuando las categorías estén disponibles
    }
  }, [categories]);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalCategory = queryParams.get("newCategory");
  const noteId = queryParams.get("noteId");
  const show = modalCategory ? true : false;

  const { mutate } = useMutation({
    mutationFn: addCategoryToNote,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddCategory = (noteId: Note["id"], categoryIds: string[] | string) => {
    const categoriesArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    const data = {
      noteId,
      formData: categoriesArray,
    };

    mutate(data);
  };


  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Add category
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Choose what category you would like to add to the {""}
                    <span className="text-fuchsia-600">note</span>
                  </p>

                  {notesCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between gap-x-4 mt-5"
                    >
                      <p className="text-xl font-bold">{category.title}</p>
                      <button
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 text-white font-bold rounded-lg"
                        onClick={() => {
                          handleAddCategory(noteId, category.id);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
