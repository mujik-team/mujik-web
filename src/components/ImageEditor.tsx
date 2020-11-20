import React, { useEffect, useRef, useState } from "react";
import { Slider } from "primereact/slider";
import AvatarEditor from "react-avatar-editor";
import Button from "./Button";
import styled from "styled-components";

type Props = {
  imageUrl?: string;
  imageSelected?: (imageBlob: any) => void | Promise<void>;
  editorType: "avatar" | "mixtape_image" | "tournament_image";
};

function ImageEditor(props: Props) {
  const [scale, setScale] = useState(1.0);
  const [editorImage, setEditorImage] = useState("");
  const [currentImage, setCurrentImage] = useState(props.imageUrl);

  const editorDimensions = () => {
    switch (props.editorType) {
      case "avatar":
        return { width: 250, height: 250, borderRadius: 125 };
      case "mixtape_image":
        return { width: 300, height: 300, borderRadius: 8 };
      case "tournament_image":
        return { width: 450, height: 300, borderRadius: 8 };
    }
  };

  useEffect(() => {
    setCurrentImage(props.imageUrl);
  }, [props.imageUrl]);

  const editor = useRef(null as any);

  const selectImage = () => {
    // Convert canvas to image/webp blob.
    const canvas = editor.current.getImageScaledToCanvas();

    canvas.toBlob(
      (blob: any) => {
        if (props.imageSelected) props.imageSelected(blob);

        const blobUrl = URL.createObjectURL(blob);
        setEditorImage("");
        setCurrentImage(blobUrl);
      },
      "image/webp",
      1.0
    );
  };

  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorImage((event.currentTarget.files as any)[0]);
  };

  const openImageSelectionDialog = () =>
    document.getElementById("avatar-upload")!.click();

  const Editor = (
    <div>
      <AvatarEditor
        ref={editor}
        image={editorImage}
        width={editorDimensions().width}
        height={editorDimensions().height}
        borderRadius={editorDimensions().borderRadius}
        crossOrigin="anonymous"
        scale={scale}
      />

      <ZoomSlider
        value={(scale - 1) * 100}
        onChange={(e) => setScale((e.value as number) / 100 + 1)}
      />

      <EditorButton onClick={selectImage}>Select</EditorButton>
      <EditorButton onClick={() => openImageSelectionDialog()}>
        Change Image
      </EditorButton>
      <EditorButton onClick={() => setEditorImage("")}>
        <i className="mdi mdi-close" />
      </EditorButton>
    </div>
  );

  return (
    <Container>
      {editorImage ? (
        Editor
      ) : (
        <Image
          dimensions={editorDimensions()}
          image={currentImage || ""}
          onClick={() => openImageSelectionDialog()}
        />
      )}
      <input
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageSelected}
      />
    </Container>
  );
}

type ImageProps = {
  image: string;
  dimensions: { width: number; height: number; borderRadius: number };
};

export default ImageEditor;

const Container = styled.div`
  text-align: center;
`;

const Image = styled.div`
  cursor: pointer;
  background-color: var(--card-color);
  margin: auto;
  background-image: ${(props: ImageProps) => `url(${props.image})`};
  width: ${(props: ImageProps) => props.dimensions.width + "px"};
  height: ${(props: ImageProps) => props.dimensions.height + "px"};
  border-radius: ${(props: ImageProps) => props.dimensions.borderRadius + "px"};
  /* margin-bottom: 50px; */
  /* box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.212); */
`;

const EditorButton = styled(Button)`
  margin-right: 10px;
`;

const ZoomSlider = styled(Slider)`
  margin: 20px;
`;
