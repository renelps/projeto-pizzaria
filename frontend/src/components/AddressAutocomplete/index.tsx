import React, { useEffect, useState } from 'react';
import { buscarEstados, buscarCidades } from '../../services/ibge';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
  width: 100%;
  color: white;
  font-size: 14px;
`;

const Label = styled.label`
  color: white;
`;

const ListaSugestoes = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #111;
  border: 1px solid #444;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Sugestao = styled.div`
  cursor: pointer;
  color: white;
  padding: 8px 10px;
  border-bottom: 1px solid #333;

  &:hover {
    background-color: #222;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export function AddressAutocomplete() {
  const [estados, setEstados] = useState<{ nome: string; sigla: string }[]>([]);
  const [estado, setEstado] = useState('');
  const [sugestoesEstado, setSugestoesEstado] = useState<{ nome: string; sigla: string }[]>([]);

  const [cidades, setCidades] = useState<string[]>([]);
  const [cidade, setCidade] = useState('');
  const [sugestoesCidade, setSugestoesCidade] = useState<string[]>([]);

  useEffect(() => {
    buscarEstados().then(setEstados);
  }, []);

  const handleEstadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEstado(value);
    setSugestoesEstado(estados.filter((uf) => uf.nome.toLowerCase().includes(value.toLowerCase())));
    setCidade('');
    setCidades([]);
    setSugestoesCidade([]);
  };

  const selecionarEstado = (uf: { nome: string; sigla: string }) => {
    setEstado(uf.nome);
    setSugestoesEstado([]);
    buscarCidades(uf.sigla).then(setCidades);
  };

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCidade(value);
    setSugestoesCidade(cidades.filter((cidade) => cidade.toLowerCase().includes(value.toLowerCase())));
  };

  const selecionarCidade = (nome: string) => {
    setCidade(nome);
    setSugestoesCidade([]);
  };

  return (
    <Container>
      <InputWrapper>
        <Label>Estado</Label>
        <Input type="text" value={estado} onChange={handleEstadoChange} placeholder="Ex: Pernambuco..." />
        {sugestoesEstado.length > 0 && (
          <ListaSugestoes>
            {sugestoesEstado.map((uf) => (
              <Sugestao key={uf.sigla} onClick={() => selecionarEstado(uf)}>
                {uf.nome}
              </Sugestao>
            ))}
          </ListaSugestoes>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label>Cidade</Label>
        <Input type="text" value={cidade} onChange={handleCidadeChange} placeholder="Ex: Pesqueira..." />
        {sugestoesCidade.length > 0 && (
          <ListaSugestoes>
            {sugestoesCidade.map((cidadeNome) => (
              <Sugestao key={cidadeNome} onClick={() => selecionarCidade(cidadeNome)}>
                {cidadeNome}
              </Sugestao>
            ))}
          </ListaSugestoes>
        )}
      </InputWrapper>
    </Container>
  );
}
