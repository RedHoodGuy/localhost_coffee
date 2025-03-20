import Collections from "./components/Collections/Collections";
import ImageSlider from "./components/ImageSlider/ImageSlider";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
     <ImageSlider/>
     <Collections/>
    </div>
  );
}
