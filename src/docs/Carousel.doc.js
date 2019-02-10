import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import Carousel from '../components/base/Carousel';

const snippet = `
import { Modal } from 'app-components';

const MyComp = () => (
  <div>
    ...
    <Carousel>
      ...
    </Carousel>
  </div>
);
`;

export default class CarouselDoc extends React.Component {
	slideRenderer = id => (
		<Slide/>
	);
	
	render() {
		const title = 'carousel';
		const description = 'carousel';
		
		return (
			<Base title={title} description={description} name="Carousel">
				<Row>
					<Col>
						<Highlight language="javascript">{snippet}</Highlight>
					</Col>
				</Row>
				
				<Row>
					<Col direction="row">
						<StyledCarousel
							total={5}
							slideRenderer={this.slideRenderer}
						/>
					</Col>
				</Row>
			</Base>
		);
	}
}

const Slide = styled.div`
	background: url('https://source.unsplash.com/user/noah2199/800x360') no-repeat;
	background-size: cover;
	overflow: hidden;
	width: 100%;
	border-radius: 4px;
	height: 360px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	border: 1px solid ${({theme}) => theme.p200};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledCarousel = styled(Carousel)`
	width: 800px;
`;