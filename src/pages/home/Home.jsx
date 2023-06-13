import { useState, useEffect, useRef } from "react";
import { Api } from "../../services/api.js";
import { motion } from "framer-motion";
import dragaoBrancoCarrossel from '../../assets/dragaoBrancoCarrossel.jpg'
import joeyCarrossel from '../../assets/joeyCarrossel.jpg'
import yugiohCarrossel from '../../assets/yugiohCarrossel.jpg'
import Loading from '../../assets/loading.png'
import {
  ContentContainer,
  CarrosselConteiner,
  ProdutosConteiner,
  CardContainer,
  CardBody,
  ImgContainer,
  MaisProcurados,
} from "./style.js";

const images = [yugiohCarrossel, joeyCarrossel, dragaoBrancoCarrossel]

export function Home() {
  const carousel = useRef();
  const [width, setWidth] = useState(0)



  useEffect(() => {
    console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, []);

  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data: result } = await Api.get("/produtos")
      setProd(result);
      setLoading(false)
    }

    fetchData();
  }, []);

  const [promo, setPromo] = useState([]);

  useEffect(() => {
  }, []);


  return (
    <div className="container">
      <ContentContainer>

        <CarrosselConteiner>

          <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing" }}>
            <motion.div
              className="inner"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.9 }}
            >

              {images.map(image => (
                <motion.div className="item" key={image}>
                  <img src={image} alt={image} />
                </motion.div>
              ))}

            </motion.div>
          </motion.div>

        </CarrosselConteiner>

        <MaisProcurados>
          <h3>Mais procurados</h3><br />

          {loading ? <img className="loading" src={Loading} alt="loading"></img> :
            <ProdutosConteiner>
              {prod.filter((prod) => prod.valorUnitario < 31).map((produto) => {
                return (
                  <CardContainer key={produto.idProduto}>
                    <ImgContainer>
                      <a href="http://localhost:5173/shop">
                        <img
                          src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${produto.idProduto}/img`}
                          alt={produto.nome}
                        />
                      </a>
                    </ImgContainer>
                    <CardBody>
                      <h6 className="card-title">{produto.nome}</h6>
                    </CardBody>
                    <h6 className="card-price">R$ {produto.valorUnitario}</h6>
                  </CardContainer>
                );
              })}

            </ProdutosConteiner>
          }
        </MaisProcurados>

      </ContentContainer>
    </div>
  )

}

export default Home;