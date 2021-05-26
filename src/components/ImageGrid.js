import Card from "@/components/Card";
import Image from "@/components/Image";

export default function ImageGrid(props) {
  return (
      <ul
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-x-4 xl:grid-cols-4 xl:gap-x-8"
      >
        {props.data.map((image) => (
          <li key={image.url} className="relative">
            <div className="group block w-full h-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
              <Card {...props} {...image}>
                <Image
                  src={image.url}
                  alt={image.original_filename} 
                  className="object-fit pointer-events-none mx-auto"
                />
              </Card>
            </div>
          </li>
        ))}
      </ul>
      )}