import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  category?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  image?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  category,
  author,
  image,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="card-container flex flex-col justify-around group h-full overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg">
        {image && (
          <div className="relative w-full h-48 overflow-hidden bg-muted -m-8 mx-auto mb-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/*gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <CardHeader className="space-y-2">
          {category && (
            <div className="flex gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full border border-primary text-primary bg-primary/5 w-fit">
                {category}
              </span>
            </div>
          )}

          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
            {title}
          </CardTitle>

          <CardDescription className="line-clamp-2 text-sm">
            {excerpt}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col gap-4 items-center w-full border-t border-border p-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {author?.name?.[0] || "A"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {author?.name || "Author"}
              </span>
            </div>
          </div>
          <CardContent className="text-right p-0 w-full">
            <div className="flex items-center gap-2 text-primary/70 text-sm font-medium group-hover:gap-3 transition-all">
              Read Article <ArrowRight className="size-4" />
            </div>
          </CardContent>
        </CardFooter>
      </Card>
    </Link>
  );
}
