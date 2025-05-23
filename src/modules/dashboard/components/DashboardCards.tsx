import { Grid, Card, Typography, IconButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  route: string;
  description: string;
}

interface DashboardCardsProps {
  cards: DashboardCard[];
}

export const DashboardCards = ({ cards }: DashboardCardsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {cards.map((card, index) => (
        <Grid xs={12} sm={4} key={card.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              variant="outlined"
              className="h-full cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(card.route)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconButton
                    variant="soft"
                    color={card.color as any}
                    className="rounded-full"
                  >
                    {card.icon}
                  </IconButton>
                  <Typography level="title-md">{card.title}</Typography>
                </div>
                <Typography
                  level="h3"
                  className={`text-${card.color}-600 font-bold`}
                >
                  {card.count}
                </Typography>
              </div>
              <Typography level="body-sm" className="text-gray-600">
                {card.description}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </>
  );
};
