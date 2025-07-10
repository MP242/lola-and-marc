"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    presence: "",
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    setIsEndDialogOpen(true);
  };

  const handlePresenceClick = (response: string) => {
    setFormData((prev) => ({ ...prev, presence: response }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.nom && formData.prenom && formData.presence) {
      console.log("Données du formulaire:", formData);
      alert(
        `Merci ${formData.prenom} ${formData.nom} ! Votre réponse "${formData.presence}" a été enregistrée.`
      );
      setIsEndDialogOpen(false);
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Modale de bienvenue */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Bienvenue !
            </DialogTitle>
            <DialogDescription>
              Cliquez sur le bouton pour lancer la vidéo
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={handlePlayVideo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Lancer la vidéo
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de fin de vidéo */}
      <Dialog open={isEndDialogOpen} onOpenChange={setIsEndDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Est-ce que vous venez au mariage ?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Boutons Oui/Non */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handlePresenceClick("oui")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  formData.presence === "oui"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-green-100"
                }`}
              >
                Oui
              </button>
              <button
                onClick={() => handlePresenceClick("non")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  formData.presence === "non"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-red-100"
                }`}
              >
                Non
              </button>
            </div>

            {/* Champs nom et prénom */}
            <div className="space-y-3">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Envoyer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contenu principal */}
      <video
        ref={videoRef}
        src="/video.mp4"
        onEnded={handleVideoEnd}
        className={`transition-opacity duration-500 ${
          isVideoPlaying ? "opacity-100" : "opacity-50"
        }`}
      />
    </div>
  );
}
